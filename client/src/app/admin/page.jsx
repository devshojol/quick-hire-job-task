"use client";

import { useEffect, useState } from "react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminStats from "../../components/admin/AdminStats";
import CreateJobForm from "../../components/admin/CreateJobForm";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import JobsTable from "../../components/admin/JobsTable";
import Toast from "../../components/admin/Toast";
import { deleteJob, fetchJobs } from "../../lib/api";

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs({});
      setJobs(data?.data || []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      showToast("Job deleted successfully", "success");
      setDeleteConfirm(null);
      loadJobs();
    } catch {
      showToast("Failed to delete job", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}

      {deleteConfirm && (
        <DeleteConfirmModal
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        <AdminHeader
          showForm={showForm}
          onToggle={() => setShowForm((p) => !p)}
        />

        <AdminStats jobs={jobs} />

        {showForm && (
          <CreateJobForm
            onSuccess={(msg) => {
              showToast(msg, "success");
              loadJobs();
            }}
            onError={(msg) => showToast(msg, "error")}
            onClose={() => setShowForm(false)}
          />
        )}

        <JobsTable
          jobs={jobs}
          loading={loading}
          onDeleteClick={setDeleteConfirm}
          onAddJobClick={() => setShowForm(true)}
        />
      </div>

      <Footer />
    </div>
  );
}
