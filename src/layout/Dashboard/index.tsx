const Dashboard = () => {
    return(
    <div className='flex justify-center items-center w-full h-[100vh] bg-[#131428]'>
      <div className=' textstyle max-sm:top-[7%] mt-[10brem] absolute z-20'>
        <h3 className='text-white text-[30px] text-center h-full font-bold '/>
        <div>
          <div className=' w-[500px] flex'>
            <div className=' w-[500px] flex justify-start'>
              <div className='h-[35px] w-[70px] bg-[#fff] absolute ml-2 mt-[5px] z-10 text-center rounded-lg'>Swap</div>
            </div>
            <div className='w-[500px] flex justify-end'>
             <div className=' h-[35px] w-[40px] bg-[#fff] absolute mr-2 mt-[5px] z-[-1] text-center rounded-lg'/>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Dashboard;