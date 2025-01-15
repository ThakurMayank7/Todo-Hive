import React from 'react'

function OverallPerformance() {

    const handleClick = () => {
        const end = Date.now() + 3 * 1000; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
     
        const frame = () => {
          if (Date.now() > end) return;
     
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
          });
     
          requestAnimationFrame(frame);
        };
     
        frame();
      };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white text-center my-2">
        Overall Performance
      </h1>
      <div className='flex justify-center items-center h-60 bg-green-500 my-4'>

      </div>
      <div className='flex flex-row gap-8'>
        <div className='w-1/3 bg-white h-60 rounded'></div>
        <div className='w-1/3 bg-white h-60 rounded'></div>
        <div className='w-1/3 bg-white h-60 rounded'></div>
      </div>
    </div>
  )
}

export default OverallPerformance