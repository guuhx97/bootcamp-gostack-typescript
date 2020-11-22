import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: background 0.2s;

    &:hover{
      color: #666;
    }
  }

  svg: {
    margin-right: 4px;
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header{
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;
  
    li{
      & + li {
        margin-left: 80px;
      }

      strong{
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c6c
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 80px;

  a {
    align-items: center;
    background: #fff;
    border-radius: 5px;
    display: block;
    display: flex;
    padding: 24px;
    text-decoration: none;
    width: 100%;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);  
    }

    div {
      margin: 0 16px;
      flex: 1;
      
      strong {
        color: #3d3d4d;
        font-size: 20px;
      }

      p {
        color: #a8a8b3;
        font-size: 18px; 
        margin-top: 4px;
      }
      
      svg {
        margin-left: auto;
        color: #cbcbc6
      }
    }
  }
`;