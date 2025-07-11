import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../utils/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  console.log(note);

  const handleDelete = async () => {
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
        toast.success("Note deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error in handleDelete", error);
        toast.error("Failed to delete then note!");
      }
    };
  };
  const handleSave = async () => {
    if (!note.data.title.trim() || !note.data.content.trim())
      return toast.error("All fields are required!");

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note.data);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error saving the note", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline rounded-2xl"
            >
              <Trash2Icon className="sze-5" />
              Delete note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.data.title}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      data: { ...note.data, title: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.data.content}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      data: { ...note.data, content: e.target.value },
                    })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-secondary rounded-2xl"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
