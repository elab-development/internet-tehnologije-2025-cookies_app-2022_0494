"use client";

import Loading from '@/components/Loading';
import useAuthContext from '@/hooks/useAuthContext';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const courseId = "65e6010f39e3036a65084c10";
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure loading state is handled correctly
    if (user !== null) {
      if (!user.courses.includes(courseId)) {
        redirect("/");
      } else {
        setLoading(false);
      }
    }
  }, [user]);

  if (loading) {
    return (
      <div className='pt-[500px] bg-red-700'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='pt-[500px] bg-red-700'>
      <p>cao</p>
    </div>
  );
}