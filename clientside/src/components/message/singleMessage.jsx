import React, { useEffect, useState } from "react";

const SingleMessage = (props) => {
  return (
    <React.Fragment>
      {props.message.sender ? (
        props.myUserDetail.email !== props.message.sender.email ? (
          <div>
            <h6>
              {props.message.sender.username}~{props.message.timeStamp}
            </h6>
            <div className="row bg-light-grey chat-box-borders-sender p-3 mb-4 shadow">
              <div className="col-md-1 text-center mb-2">
                <img
                  src={"http://localhost:8080/" + props.message.sender.imageURL}
                  alt=""
                  width="75"
                />
              </div>
              <div className="col-md-11">{props.message.message}</div>
            </div>
          </div>
        ) : (
          <div>
            <h6 className="text-end">
              {props.message.sender.username}~{props.message.timeStamp}
            </h6>
            <div className="row flex-row-reverse bg-light-blue p-3 mb-4 chat-box-borders-receiver shadow">
              <div className="col-md-12">{props.message.message}</div>
            </div>
          </div>
        )
      ) : (
        ""
      )}
      {/* {props.myUserDetail.email !== props.message.sender.email ? (
        <div>
          <h6>
            {props.message.sender.username}~{props.message.timeStamp}
          </h6>
          <div className="row bg-light-grey chat-box-borders-sender p-3 mb-4 shadow">
            <div className="col-md-1 text-center mb-2">
              <img
                src={"http://localhost:8080/" + props.message.sender.imageURL}
                alt=""
                width="45"
              />
            </div>
            <div className="col-md-11">{props.message.message}</div>
          </div>
        </div>
      ) : (
        <div>
          <h6 className="text-end">
            {props.message.sender.username}~{props.message.timeStamp}
          </h6>
          <div className="row flex-row-reverse bg-light-blue p-3 mb-4 chat-box-borders-receiver shadow">
            <div className="col-md-12">{props.message.message}</div>
          </div>
        </div>
      )} */}
    </React.Fragment>
  );
};

export default SingleMessage;
