import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUser,deleteOrLogoutUser } from '../redux/user/userSlice';
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import LoadingEffect from '../components/LoadingEffect';

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
  const [deleteDialogBox,setDeleteDialogBox]=useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = async (file) => {
    setMessage("");
    setFilePerc(0);
    setFileUploadError(false);
    if (file.size >= 2*1024 * 1024) {
      setFileUploadError(true);
      setMessage('Only images less than 2 MB are allowed');
      return;
    }
    
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
        setIsUploading(false);
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
      setMessage('Only images less than 2 MB are allowed');
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
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [fileUploadError, filePerc]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, pic,password } = formData;
    if (userName === currentUser.userName && email === currentUser.email && pic === currentUser.pic && !password){
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

  const navigate=useNavigate()

  const handleDelete=async()=>{
    
    const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if(res.status===200){
      toast.success(data.message);
      navigate("/", { replace: true });
    }

    
    else{
      toast.error(data.message);
    }
    
    if(res.status===200) dispatch(deleteOrLogoutUser());
  }

  const handleLogout=async ()=>{
    const res=await fetch("/api/auth/logout")
    const data=await res.json();

    if(res.status===200){
      toast.success(data.message);
      dispatch(deleteOrLogoutUser());
    }

    else toast(data.message);
  }

  return (
    <>
    {deleteDialogBox?(<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xl z-50">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-xl font-bold mb-4">Delete Profile!</h2>
        <p className="mb-4">Are you sure you want to delete your profile?</p>
        <p className="mb-4 mx-10">This action cannot be undone!</p>
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
          >
            Delete
          </button>
          <button
            onClick={(e)=>setDeleteDialogBox(false)}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>) :
    
    (<div className='bg-slate-200 border-4 border-black bg-opacity-80 p-4 rounded-lg shadow-md relative z-10 overflow-hidden mx-3 w-[350px] sm:w-96 md:w-[420px]'>
      <div className='flex items-center justify-center'>
        <h1 className='text-3xl font-semibold text-center my-7 text-slate-800'>
          Profile
        </h1>

        <Link to={"/"} className=" translate-x-12 hover:cursor-pointer">
          <div data-tooltip-id="my-tooltip" data-tooltip-content="Go to the home page" >
            <FaHome />
          </div>
          <Tooltip id="my-tooltip" />
        </Link>

      </div>
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
                    ? 'text-slate-800'
                    : 'text-green-700'
              }
            >
              {message}
            </span>
          )}
        </p>
        <input
          type="text"
          placeholder='Change Username'
          defaultValue={currentUser.userName}
          id='userName'
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-shadow'
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder='Change Email'
          defaultValue={currentUser.email}
          id='email'
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-shadow'
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='Change Password'
          id='password'
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-shadow'
          onChange={handleChange}
        />
        {loading ? (
          <div className='flex items-center justify-center'>
            <LoadingEffect/>
          </div>
        ) : (
          <button
            className='bg-slate-600 text-white rounded-lg p-3 uppercase hover:bg-slate-700
            disabled:opacity-80 transition-all' disabled={isUploading}
          >
            {isUploading ? "Processing..." : "Update"}
          </button>
        )}
      </form>
      <div className="flex justify-between mt-7 text-red-800 font-semibold">
        <span className='cursor-pointer hover:underline hover:text-red-900' onClick={(e)=>setDeleteDialogBox(true)}>
          Delete account
        </span>
        <span className='cursor-pointer hover:underline hover:text-red-900' onClick={handleLogout}>
          Logout 
        </span>
      </div>
    </div>)}
  </>
  );
}