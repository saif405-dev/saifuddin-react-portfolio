
import React, { useEffect, useState } from "react";
import { getMessages, updateMessageStatus } from "../services/adminApi";

const AdminInbox = ({ token, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const loadMessages = async () => {
    try {
      setError("");
      const data = await getMessages(token);
      setMessages(data.messages || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [token]);

  const changeStatus = async (id, status) => {
    try {
      const result = await updateMessageStatus(token, id, status);

      setMessages((previous) =>
        previous.map((item) =>
          item._id === id ? result.data : item
        )
      );

      setSelected(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredMessages =
    filter === "all"
      ? messages
      : messages.filter((item) => item.status === filter);

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Portfolio Inbox</h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage visitor messages
            </p>
          </div>

          <button
            onClick={onLogout}
            className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Logout
          </button>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {["all", "unread", "read", "replied"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-lg px-4 py-2 capitalize ${
                filter === item
                  ? "bg-indigo-600"
                  : "bg-slate-900 text-slate-400"
              }`}
            >
              {item}
            </button>
          ))}

          <button
            onClick={loadMessages}
            className="ml-auto rounded-lg bg-slate-800 px-4 py-2"
          >
            Refresh
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-950 p-3 text-red-300">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-slate-400">Loading messages...</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-3">
              {filteredMessages.map((item) => (
                <button
                  key={item._id}
                  onClick={() => {
                    setSelected(item);
                    if (item.status === "unread") {
                      changeStatus(item._id, "read");
                    }
                  }}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    selected?._id === item._id
                      ? "border-indigo-500 bg-slate-900"
                      : "border-slate-800 bg-slate-900/60 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex justify-between gap-3">
                    <strong>{item.name}</strong>
                    <span className="text-xs text-indigo-300">
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-400">
                    {item.email}
                  </p>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                    {item.message}
                  </p>
                </button>
              ))}

              {filteredMessages.length === 0 && (
                <p className="rounded-xl border border-slate-800 p-5 text-slate-400">
                  No messages found.
                </p>
              )}
            </div>

            <div className="min-h-80 rounded-xl border border-slate-800 bg-slate-900 p-6">
              {selected ? (
                <>
                  <h2 className="text-xl font-bold">
                    {selected.subject || "Portfolio Inquiry"}
                  </h2>

                  <p className="mt-3 text-sm text-slate-400">
                    From: {selected.name} ({selected.email})
                  </p>

                  <p className="mt-6 whitespace-pre-wrap text-slate-200">
                    {selected.message}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {["unread", "read", "replied"].map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          changeStatus(selected._id, status)
                        }
                        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm capitalize hover:bg-indigo-500"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-slate-500">
                  Select a message to read
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInbox;
