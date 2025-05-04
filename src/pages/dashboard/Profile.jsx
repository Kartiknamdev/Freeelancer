import { useState } from 'react';
import { HiPencil, HiOutlineDocumentAdd } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Profile = () => {
  const [editing, setEditing] = useState(false); // Placeholder for editing state
  const avatarPreview =
    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'; // Placeholder avatar
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'This is a placeholder bio.',
    userType: 'worker', // 'client' or 'worker'
    skills: ['Proofreading', 'Editing', 'Research'],
    rating: 4.5,
    completedTasks: 12,
  };

  const handleImageChange = (e) => {
    // Placeholder for image change handler
    console.log('Image changed:', e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission
    console.log('Form submitted');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        {/* Banner and avatar */}
        <div className="relative h-32 bg-gradient-to-r from-primary-600 to-accent-600">
          <div className="absolute -bottom-12 left-6 sm:left-8">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white overflow-hidden bg-white">
              <img
                src={avatarPreview}
                alt={user.name}
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
                      onChange={handleImageChange}
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
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    defaultValue={user.name}
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
                    defaultValue={user.email}
                    disabled
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email address cannot be changed
                  </p>
                </div>

                <div>
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="form-input"
                    placeholder="Tell clients/workers about yourself..."
                    defaultValue={user.bio}
                  />
                </div>

                {user.userType === 'worker' && (
                  <div>
                    <label htmlFor="skills" className="form-label">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      id="skills"
                      className="form-input"
                      placeholder="e.g., Proofreading, Editing, Research"
                      defaultValue={user.skills.join(', ')}
                    />
                  </div>
                )}

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
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>

              <div className="mt-1 flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {user.userType === 'client' ? 'Client' : 'Worker'}
                </span>

                <div className="ml-3 flex items-center text-yellow-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="ml-1 text-xs text-gray-700">
                    {user.rating} ({user.completedTasks} tasks)
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-base font-medium text-gray-900">Bio</h3>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">
                  {user.bio || 'No bio provided yet.'}
                </p>
              </div>

              {user.userType === 'worker' && (
                <div className="mt-6">
                  <h3 className="text-base font-medium text-gray-900">Skills</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
