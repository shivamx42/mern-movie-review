import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUser } from '../redux/user/userSlice';
import { ThreeCircles } from 'react-loader-spinner';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    userName: currentUser.userName,
    email: currentUser.email,
    pic: currentUser.pic,
  });
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
    setIsUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, pic: downloadURL }));
        });
        setIsUploading(false);
      }
    );
  };

  useEffect(() => {
    let timer;
    if (fileUploadError) {
      setMessage('Image Must be less than 2 MB');
    } else if (filePerc > 0 && filePerc < 100) {
      setMessage(`Uploading ${filePerc}%`);
    } else if (filePerc === 100) {
      setMessage('Image successfully uploaded!');
    } else {
      setMessage('');
    }

    if (message) {
      timer = setTimeout(() => {
        setMessage('');
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [fileUploadError, filePerc]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, pic,password } = formData;
    if (userName === currentUser.userName && email === currentUser.email && pic === currentUser.pic && password===""){
      toast.info("Change at least one of the details!");
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    setLoading(false);
    const data = await res.json();
    if (res.status === 200) {
      toast.success(data.message);
      dispatch(updateUser(data.userData));
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className='p-4 w-80 sm:w-96 mx-auto md:w-[450px] mt-2 bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden border border-black'>
      <h1 className='text-3xl font-semibold text-center my-7 text-slate-800 dark:text-slate-200'>
        Profile
      </h1>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => { setFile(e.target.files[0]) }} />
        <img
          src={formData.pic || currentUser.pic}
          alt="Profile Image"
          className='rounded-full h-20 w-20 object-cover cursor-pointer self-center mt-2 shadow-lg transition-transform transform hover:scale-105 border-2 border-black'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {message && (
            <span
              className={
                fileUploadError
                  ? 'text-red-700'
                  : filePerc > 0 && filePerc < 100
                    ? 'text-blue-600'
                    : 'text-green-700'
              }
            >
              {message}
            </span>
          )}
        </p>
        <input
          type="text"
          placeholder='Username'
          defaultValue={currentUser.userName}
          id='userName'
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-shadow'
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder='Email'
          defaultValue={currentUser.email}
          id='email'
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-shadow'
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='Password'
          id='password'
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-shadow'
          onChange={handleChange}
        />
        {loading ? (
          <div className='flex items-center justify-center'>
            <ThreeCircles
              visible={true}
              height="40"
              width="40"
              color="black"
              ariaLabel="three-circles-loading"
            />
          </div>
        ) : (
          <button
            className='bg-slate-600 text-white rounded-lg p-3 uppercase hover:bg-slate-700
            dark:hover:bg-slate-800 disabled:opacity-80 transition-all' disabled={isUploading}
          >
            {isUploading ? "Uploading Image..." : "Update"}
          </button>
        )}
      </form>
      <div className="flex justify-between mt-7">
        <span className='text-red-700 cursor-pointer hover:underline transition-colors'>
          Delete account
        </span>
        <span className='text-red-700 cursor-pointer hover:underline transition-colors'>
          Sign out
        </span>
      </div>
    </div>
  );
}