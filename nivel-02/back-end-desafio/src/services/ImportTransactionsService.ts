import csvParse from 'csv-parse';
import fs from 'fs';
import { getCustomRepository, getRepository, In } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface CSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoriesRepository = getRepository(Category);

    const contactsReadStream = fs.createReadStream(filePath);
    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({
        title,
        type,
        value,
        category,
      });
    });
    await new Promise(resolve => parseCSV.on('end', resolve));

    const categoriesExist = await categoriesRepository.find({
      where: {
        title: In(categories),
      },
    });

    const categoriesExistTitle = categoriesExist.map(
      (cate: Category) => cate.title,
    );

    const addCategoryTitles = categories
      .filter(cate => !categoriesExistTitle.includes(cate))
      .filter((v, index, self) => self.indexOf(v) === index);

    const newCategories = categoriesRepository.create(
      addCategoryTitles.map(t => ({
        title: t,
      })),
    );

    await categoriesRepository.save(newCategories);

    const finalCategories = [...newCategories, ...categoriesExist];

    const createdTransactios = transactionRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: finalCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    await transactionRepository.save(createdTransactios);

    await fs.promises.unlink(filePath);

    return createdTransactios;
  }
}

export default ImportTransactionsService;
