import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg';
import styled from "styled-components";
export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    // console.log(contacts);
    const fetchData = async () => {
      try {
        if (currentUser) {
          setCurrentUserImage(currentUser.avatarImage);
          setCurrentUserName(currentUser.Username);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return <>
    {
      currentUserImage && currentUserName &&
      (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3 className='he'>i am beside you</h3>
          </div>
          <div className="contacts">
            {contacts.map((Contact, index) => {
              return (
                <div
                  key={index}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, Contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${Contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3 className='yo'>{Contact.Username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )
    }
  </>;

}

const Container = styled.div`
display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
      padding-left:0px;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      font-size:25px;
      padding-right:10px;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
          padding-top: 5px;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3.3rem;
        max-inline-size: 100%;
        padding-left:10px;
        padding-right:0px;
      }
    }
    .username {
      h2 {
        color: white;
        padding-right:10px;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
