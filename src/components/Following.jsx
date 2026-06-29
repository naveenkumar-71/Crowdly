import React from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import jungkook from "../assets/jungkook.jpg"


function Following({ onClose, type}) {
  const followers = [
    {
      username: "account name",
      name: "user name",
      image: jungkook,
    },
    {
      username: "account name",
      name: "user name",
      image: jungkook,
    },
    {
      username: "account name",
      name: "user name",
      image: jungkook,
    },
    {
      username: "account name",
      name: "user name",
      image: jungkook,
    },
    {
      username: "account name",
      name: "user name",
      image: jungkook,
    },
  ];
  const following=[{
    username:"mnijungkook",
    name:"jungkook",
    image:jungkook
  }]

  return (
    <>
      {/* Black Overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <div
          className="w-[560px] h-[620px] bg-white rounded-2xl shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative flex items-center justify-center h-14 border-b">
            <h2 className="font-semibold text-lg">{type}</h2>

            <button
              onClick={onClose}
              className="absolute right-4 text-3xl"
            >
              <IoClose />
            </button>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 h-10">
              <IoSearch className="text-gray-500" />

              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent outline-none ml-2"
              />
            </div>
          </div>

          {/* Followers */}
          <div className="overflow-y-auto h-[500px]">
            {type=="followers" ? followers.map((user, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-5 py-3 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.image}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-sm">
                      {user.username}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {user.name}
                    </p>
                  </div>
                </div>

                <button className="bg-gray-200 hover:bg-gray-300 font-semibold px-5 py-2 rounded-lg text-sm">
                  Remove
                </button>
              </div>
            )) : (
              following.map((user, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-5 py-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-sm">
                        {user.username}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {user.name}
                      </p>
                    </div>
                  </div>

                  <button className="bg-gray-200 hover:bg-gray-300 font-semibold px-5 py-2 rounded-lg text-sm">
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Following;