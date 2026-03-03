const API_URL =
  process.env.NODE_ENV === "development"
    ? "https://quickhire-green.vercel.app"
    : "http://localhost:8888";

export const fetchJobs = async (params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== "" && v !== undefined && v !== null,
    ),
  );
  const query = new URLSearchParams(cleanParams).toString();
  const url = `${API_URL}/api/jobs${query ? `?${query}` : ""}`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch {
    return { success: false, data: [] };
  }
};

export const fetchJob = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/jobs/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

export const createJob = async (jobData) => {
  const res = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });
  const data = await res.json();
  if (!res.ok)
    throw new Error(data.error || data.message || "Failed to create job");
  return data;
};

export const deleteJob = async (id) => {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, { method: "DELETE" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to delete job");
  return data;
};

export const submitApplication = async (applicationData) => {
  const res = await fetch(`${API_URL}/api/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(applicationData),
  });
  const data = await res.json();
  if (!res.ok)
    throw new Error(
      data.error || data.message || "Failed to submit application",
    );
  return data;
};
