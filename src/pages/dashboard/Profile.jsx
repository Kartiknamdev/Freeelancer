import { useState } from "react";
import { HiPencil, HiOutlineDocumentAdd } from "react-icons/hi";
 
import { useAuth } from "../../contextStore/auth.context";
 
const Profile = () => {
  const { user, updateDetails } = useAuth(); // Access user and updateDetails from context
  const loggedUser = user.data.user;
  const [editing, setEditing] = useState(false); // State for editing mode
  const [formData, setFormData] = useState({
    fullName: loggedUser.fullName || "",
    email: loggedUser.email || "",
    phone: loggedUser.phone || "",
    age: loggedUser.age || "",
    gender: loggedUser.gender || "",
    bio: loggedUser.Bio || "",
    organization: loggedUser.organization || "",
    skills: loggedUser.skills || "", // Skills as a space-separated string
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        skills: formData.skills.split(" ").map((skill) => skill.trim()), // Convert skills to an array
      };
      console.log("Updated Data:", updatedData);
      await updateDetails(updatedData); // Call updateDetails with the updated data
      alert("Profile updated successfully!");
      setEditing(false); // Exit editing mode after saving
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };
  return (
    <div>
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        {/* Banner and avatar */}
        <div className="relative h-32 bg-gradient-to-r from-primary-600 to-accent-600">
          <div className="absolute -bottom-12 left-6 sm:left-8">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white overflow-hidden bg-white">
              <img
                src={loggedUser.photo || "https://via.placeholder.com/150"}
                alt={""}
                className="h-full w-full object-cover"
              />
              {editing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <label className="cursor-pointer p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors">
                    <HiPencil className="h-5 w-5 text-gray-700" />
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFormData((prev) => ({ ...prev, photo: file }));
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {!editing && (
            <button
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
              onClick={() => setEditing(true)}
            >
              <HiPencil className="h-5 w-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Profile content */}
        <div className="pt-16 pb-8 px-4 sm:px-8">
          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="form-input"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input bg-gray-50"
                    value={formData.email}
                    disabled
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email address cannot be changed
                  </p>
                </div>

                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="form-input"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="form-input"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="form-label">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    className="form-input"
                    value={formData.organization}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="skills" className="form-label">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    id="skills"
                    className="form-input"
                    value={formData.skills}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {loggedUser.fullName}
              </h2>
              <p className="text-sm text-gray-500">{loggedUser.email}</p>
              <div className="mt-1 flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {user.userType === "client" ? "Client" : "Worker"}
                </span>

                <div className="ml-3 flex items-center text-yellow-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="ml-1 text-xs text-gray-700">
                    {loggedUser.rating}
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-base font-medium text-gray-900">Bio</h3>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">
                  {loggedUser.Bio || "No bio provided yet."}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-base font-medium text-gray-900">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(loggedUser.skills || "").split(" ").map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
