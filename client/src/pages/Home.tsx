import { Loader2 } from 'lucide-react';
import React, { use, useState } from 'react'
import Footer from '../components/Footer';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import api from '@/configs/axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {data:session} = authClient.useSession();
  const navigate= useNavigate();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        if(!session?.user) {
          return toast.error('Please sign in to create a project');
        }else if(!input.trim()) {
          return toast.error('Please enter a description for your project');
        }
        setLoading(true);
        const {data}= await api.post('/api/user/project', {initial_prompt: input });
        setLoading(false);
        navigate(`/project/${data.projectId}`);
    } catch (error:any) {
        setLoading(false);
        toast.error(error?.response?.data?.message || 'Something went wrong while creating the project');
    }
  }
  
  return (
      <section className="flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins">
          {/* BACKGROUND IMAGE */}
          

         

        <h1 className="text-center text-[40px] leading-[48px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-3xl">
          Turn thoughts into websites instantly, with AI.
        </h1>

        <p className="text-center text-base max-w-md mt-2">
          Create, customize and publish beautiful websites in minutes using AI-powered tools.
        </p>

        <form onSubmit={onSubmitHandler} className="bg-white/10 max-w-2xl w-full rounded-xl p-4 mt-10 border border-indigo-600/70 focus-within:ring-2 ring-indigo-500 transition-all">
          <textarea onChange={e => setInput(e.target.value)} className="bg-transparent outline-none text-gray-300 resize-none w-full" rows={4} placeholder="Describe your presentation in details" required />
          <button className="ml-auto flex items-center gap-2 bg-gradient-to-r from-[#CB52D4] to-indigo-600 rounded-md px-4 py-2">
            {! loading ? 'Create with AI' : (
              <>
              Creating <Loader2 className="animate-spin size-4 text-white" />
              </>
            )}
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-16 md:gap-20 mx-auto mt-16">
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/framer.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg" alt="" />
        </div>
        <Footer/>
      </section>
    
  )
}

export default Home