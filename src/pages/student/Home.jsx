import { Link } from "react-router-dom";
import images from "../../constants/images";

export default function Home() {
  return (
    <div className="bg-white flex items-center justify-center py-6">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-center lg:text-left space-y-4">
          <div className="font-bold text-primary">
            <h3 className="text-2xl">Welcome to</h3>
            <h1 className="text-4xl">StudyFolio Platform</h1>
          </div>
          <p className="text-gray-600 mb-6 leading-8">
            Study Folio is an e-learning platform for the Hight School of
            Computer Science. Here you will find all the lessons and activities
            that you are exposed to within the school. We make education better.
          </p>
          <div className="flex gap-3">
            <Link
              to={"modules"}
              className="p-2 border-primary border-[1px] text-white bg-primary font-bold gap-2 rounded"
            >
              See Modules
            </Link>
            <Link
              to={""}
              target="_blank"
              className="p-2 border-primary border-[1px] text-primary font-bold gap-2 rounded"
            >
              ESI SBA Website
            </Link>
          </div>
        </div>
        <div className="center">
          <img src={images.landing} alt="StudyFolio Platform" />
        </div>
      </div>
    </div>
  );
}
