
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useState, useRef, useEffect } from 'react'

const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const ref = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            passwordRef.current.type = "password"
            ref.current.src = "icons/eye.png"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if(form.site.length > 5 && form.username.length > 3 && form.password.length > 6){
            toast('Password saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
        }
        else{
            toast('Min characters required', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you want to delete?")
        if (c) {
            toast('Password deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
    }

    const editPassword = (id) => {
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        setform(passwordArray.filter(i => i.id === id)[0])
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
            <div className='md:mycontainer p-2 md:px-0  min-h-[83.6vh]'>
                <div className='font-bold text-2xl flex justify-center'>
                    <span className='text-green-400'>&lt;</span>PASS<span className='text-green-400'>OP/&gt;</span>
                </div>
                <div className='flex justify-center'>
                    Your Own Password Manager
                </div>
                <div className='flex flex-col items-center p-4 gap-8'>
                    <input name='site' id='site' value={form.site} onChange={handleChange} type="text" placeholder='Enter your URL' className='rounded-full border border-green-500 w-full px-4' />
                    <div className='w-full flex flex-col md:flex-row justify-between gap-8'>
                        <input name='username' id='username' value={form.username} onChange={handleChange} type="text" placeholder='username' className='rounded-full border border-green-500 w-full px-4' />
                        <div className="relative">
                            <input ref={passwordRef} id='password' name='password' value={form.password} onChange={handleChange} type="password" placeholder='password' className='rounded-full border border-green-500 w-full px-4' />
                            <span className='absolute right-1'>
                                <img ref={ref} onClick={showPassword} src="icons/eye.png" alt="eye" className='w-5 mx-1 my-[3px] cursor-pointer' />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-xl px-2 py-3 w-fit hover:bg-green-300'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>SAVE</button>
                </div>

                <div className="passwords">
                    <div className='font-bold text-xl py-3'>Your Passwords</div>
                    {passwordArray.length === 0 && <div>You have no passwords</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md">
                        <thead className='bg-green-700 text-white m-5'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-50'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-3 border border-white text-center'>
                                        <div className='flex justify-center items-center'>
                                            <a href={item.site} target='_blank' className='px-2'>{item.site}</a>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <img className='w-5 hover:animate-bounce' src="icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-3 border border-white text-center'>
                                        <div className='flex justify-center items-center'>
                                            <span className='px-2'>{item.username}</span>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <img className='w-5 hover:animate-bounce' src="icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-3 border border-white text-center'>
                                        <div className='flex justify-center items-center'>
                                            <span className='px-2'>{"*".repeat(item.password.length)}</span>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <img className='w-5 hover:animate-bounce' src="icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-3 border border-white text-center'>
                                        <span className='flex gap-4 justify-center items-center'>
                                            <img onClick={() => { editPassword(item.id) }} src="icons/edit.png" alt="edit" className='w-5 cursor-pointer' />
                                            <img onClick={() => { deletePassword(item.id) }} src="icons/bin.png" alt="bin" className='w-5 cursor-pointer' />
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
