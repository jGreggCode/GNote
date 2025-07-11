import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-secondary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-secondary" />
      </div>
      <h3 className="text-2xl font-bold">No notes yet</h3>
      <p className="text-base-content/70">
        This is our love story, our diary. Put your message or notes here Babe!
      </p>
      <Link to="/create" className="btn btn-secondary">
        Create Your First Note
      </Link>
    </div>
  );
};
export default NotesNotFound;
