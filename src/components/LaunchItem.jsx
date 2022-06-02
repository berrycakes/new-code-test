import React from 'react'

const LaunchItem = ({ id, launchName, success, image }) => {
  return (
    <div className=" h-48 my-4 w-full p-4 grid grid-cols-3 items-center rounded-lg border shadow-md  border-gray-700 bg-gray-800 hover:bg-gray-700">
      <img
        className="col-span-1 object-fit w-48 h-36 rounded-t-lg md:h-36 md:w-60 rounded-xl"
        src={image}
        alt=""
      />
      <div class="flex flex-col justify-between p-4 col-span-2">
        <div class="mb-2 text-2xl w-full flex justify-between font-bold tracking-tight text-gray-900 dark:text-white">
          <h5>{id}</h5>
          <h5 className="text-sm">{success}</h5>
        </div>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {launchName}
        </h5>

        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
      </div>
    </div>
  )
}

export default LaunchItem
