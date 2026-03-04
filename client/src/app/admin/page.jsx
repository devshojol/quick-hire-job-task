"use client";

import { useCallback, useEffect, useState } from "react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminStats from "../../components/admin/AdminStats";
import CreateJobForm from "../../components/admin/CreateJobForm";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import JobsTable from "../../components/admin/JobsTable";
import Toast from "../../components/admin/Toast";
import { deleteJob, fetchJobs, fetchJobStats } from "../../lib/api";

const JOBS_PER_PAGE = 10;

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const data = await fetchJobStats();
      setStats(data?.data ?? null);
    } catch {
      setStats(null);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const loadJobs = useCallback(async (currentPage = 1) => {
    setLoading(true);
    try {
      const data = await fetchJobs({ page: currentPage, limit: JOBS_PER_PAGE });
      setJobs(data?.data || []);
      setTotalPages(data?.pagination?.totalPages ?? 0);
      setTotal(data?.pagination?.total ?? 0);
    } catch {
      setJobs([]);
      setTotalPages(0);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
    loadJobs(1);
  }, [loadStats, loadJobs]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadJobs(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      showToast("Job deleted successfully", "success");
      setDeleteConfirm(null);
      const newTotal = total - 1;
      const newTotalPages = Math.ceil(newTotal / JOBS_PER_PAGE);
      const targetPage =
        page > newTotalPages ? Math.max(1, newTotalPages) : page;
      setPage(targetPage);
      await Promise.all([loadJobs(targetPage), loadStats()]);
    } catch {
      showToast("Failed to delete job", "error");
    }
  };

  const handleJobCreated = async (msg) => {
    showToast(msg, "success");
    setPage(1);
    await Promise.all([loadJobs(1), loadStats()]);
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

        <AdminStats stats={stats} loading={statsLoading} />

        {showForm && (
          <CreateJobForm
            onSuccess={handleJobCreated}
            onError={(msg) => showToast(msg, "error")}
            onClose={() => setShowForm(false)}
          />
        )}

        <JobsTable
          jobs={jobs}
          loading={loading}
          onDeleteClick={setDeleteConfirm}
          onAddJobClick={() => setShowForm(true)}
          currentPage={page}
          totalPages={totalPages}
          total={total}
          limit={JOBS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>

      <Footer />
    </div>
  );
}
