'use client'
// error.js 中所 export 的 component 必须是 client component
// 因为该 component 需要和 user 进行交互:
// 当 user click 'try again' button 时, 会执行 prop 'unstable_retry' 这个 function

export default function Error({error, unstable_retry}) {
  return (
    <main className='flex justify-center items-center flex-col gap-6'>
      <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
      <p className='text-lg'>{error.message}</p>

      <button className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg cursor-pointer hover:bg-accent-300 active:bg-accent-500' onClick={unstable_retry}>
        Try again
      </button>
    </main>
  );
}

