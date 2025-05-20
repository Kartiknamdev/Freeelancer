import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineDocument,
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineTag,
} from "react-icons/hi";
import { motion } from "framer-motion";
import { useTasks } from "../../contextStore/task.context"
const categories = [
  "ProofReading",
  "Editing",
  "Formating",
  "transcription",
  "Resume",
  "Legal",
  "Academic",
  "Bussiness",
  "Other",
];

const CreateTask = () => {
  const navigate = useNavigate();
  const { submitTask } = useTasks();

  // Form refs
  const titleRef = useRef();
  const descriptionRef = useRef();
  const requirementsRef = useRef();
  const budgetRef = useRef();
  const deadlineRef = useRef();
  const categoryRef = useRef();
  const tagsRef = useRef();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle file input
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) => {
      const fileSizeInMB = file.size / (1024 * 1024);
      return fileSizeInMB <= 10;
    });
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};

    if (!titleRef.current.value.trim()) formErrors.title = "Title is required";
    if (!descriptionRef.current.value.trim())
      formErrors.description = "Description is required";
    if (!budgetRef.current.value || isNaN(budgetRef.current.value))
      formErrors.budget = "Valid budget is required";
    if (!deadlineRef.current.value)
      formErrors.deadline = "Deadline is required";
    if (!categoryRef.current.value)
      formErrors.category = "Category is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("taskTitle", titleRef.current.value);
    formData.append("requirements", requirementsRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("budget", budgetRef.current.value);
    formData.append("deadline", deadlineRef.current.value);
    formData.append("createdBy", "userId"); // Replace this with real userId
    formData.append("status", "open");

    // Append tags properly
    tagsRef.current.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")
      .forEach((tag) => formData.append("tags", tag));

    // Append files properly
    files.forEach((file) => formData.append("attachments", file));

    // Debug print
    // for (let [key, value] of formData.entries()) {
    //   console.log(`this is from createTask:  ${key}:`, value);
    // }
    
    try {
      const result = await submitTask(formData);
      if (result?.status === 201) {
        alert("Task created successfully");
        // navigate("/history");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Task submission error:", error);
      alert("Server error");
    }
    setLoading(false);
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    requirementsRef.current.value = "";
    budgetRef.current.value = "";
    deadlineRef.current.value = "";
    categoryRef.current.value = "";
    tagsRef.current.value = "";
    setFiles([]);
    setErrors({});
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
        <p className="text-sm text-gray-600 mt-1">
          Post a new document task for freelancers to work on
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-card p-6"
      >
        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="form-label">
            Task Title <span className="text-error-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineDocument className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="title"
              className={`form-input pl-10 ${
                errors.title ? "border-error-500 focus:ring-error-500" : ""
              }`}
              placeholder="e.g., Proofread Marketing Document"
              ref={titleRef}
            />
          </div>
          {errors.title && (
            <p className="text-xs text-error-600 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="form-label">
            Task Description <span className="text-error-600">*</span>
          </label>
          <textarea
            id="description"
            className={`form-input ${
              errors.description ? "border-error-500 focus:ring-error-500" : ""
            }`}
            placeholder="Provide a detailed description of what needs to be done"
            rows={4}
            ref={descriptionRef}
          />
          {errors.description && (
            <p className="text-xs text-error-600 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <label htmlFor="requirements" className="form-label">
            Requirements
          </label>
          <textarea
            id="requirements"
            className="form-input"
            placeholder="Any specific instructions or qualifications"
            rows={3}
            ref={requirementsRef}
          />
        </div>

        {/* Budget and Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="budget" className="form-label">
              Budget (USD) <span className="text-error-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineCurrencyDollar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="budget"
                min="1"
                className={`form-input pl-10 ${
                  errors.budget ? "border-error-500 focus:ring-error-500" : ""
                }`}
                placeholder="e.g., 150"
                ref={budgetRef}
              />
            </div>
            {errors.budget && (
              <p className="text-xs text-error-600 mt-1">{errors.budget}</p>
            )}
          </div>

          <div>
            <label htmlFor="deadline" className="form-label">
              Deadline <span className="text-error-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="deadline"
                className={`form-input pl-10 ${
                  errors.deadline ? "border-error-500 focus:ring-error-500" : ""
                }`}
                ref={deadlineRef}
              />
            </div>
            {errors.deadline && (
              <p className="text-xs text-error-600 mt-1">{errors.deadline}</p>
            )}
          </div>
        </div>

        {/* Category and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="category" className="form-label">
              Category <span className="text-error-600">*</span>
            </label>
            <select
              id="category"
              className={`form-select ${
                errors.category ? "border-error-500 focus:ring-error-500" : ""
              }`}
              ref={categoryRef}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-error-600 mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="tags" className="form-label">
              Tags (comma separated)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineTag className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="tags"
                className="form-input pl-10"
                placeholder="e.g., urgent, blog, formal"
                ref={tagsRef}
              />
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="mb-8">
          <label className="form-label">Attachments</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer text-primary-600 hover:text-primary-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={(e)=>handleFileChange(e)}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX, TXT etc., up to 10MB each
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Selected Files:
              </h4>
              <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 flex justify-between items-center text-sm"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      className="text-error-600 hover:underline"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="btn-outline"
            onClick={() => navigate("/history")}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default CreateTask;
