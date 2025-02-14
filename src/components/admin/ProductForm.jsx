export default function ProductForm() {
  return (
    <>
      <form className="space-y-6 w-1/2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border`}
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Product Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border`}
            placeholder="Enter product price"
          />
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image Url
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border`}
            placeholder="Enter product imageUrl"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Product Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border`}
            placeholder="Enter product description"
          />
        </div>
        <div>
          <button
            type="submit"
            className="cursor-pointer text-sm bg-black rounded-lg text-white hover:bg-gray-800 px-6 py-2"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
