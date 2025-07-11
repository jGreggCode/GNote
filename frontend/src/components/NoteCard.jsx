import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../utils/utils";
import toast from "react-hot-toast";
import api from "../utils/axios";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    toast((t) => (
      <span className="flex items-center justify-center">
        Are you sure you want to delete this note?
        <div className="flex gap-2 items-center justify-center">
          <button
            className="btn btn-warning p-2 bg-red-400 hover:bg-red-500"
            onClick={() => {
              yes(id);
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-neutral p-2"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </span>
    ));

    const yes = async (id) => {
      try {
        api.delete(`/notes/${id}`);
        setNotes((prev) => prev.filter((note) => note._id !== id));
        toast.success("Note deleted successfully");
      } catch (error) {
        console.error("Error in handleDelete", error);
        toast.error("Failed to delete then note!");
      }
    };
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-secondary"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error">
              <Trash2Icon
                className="size-4"
                onClick={(e) => handleDelete(e, note._id)}
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;
