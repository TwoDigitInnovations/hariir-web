


const Network = () => {
    return (
        <div className="text-center pt-6 bg-cover bg-right-bottom md:bg-center bg-no-repeat min-h-[400px]"
            style={{
                backgroundImage: 'url("./Group4.png")',
                backgroundColor: "#FFFFFF66", 
            }}
        >
            <div className="py-8 flex flex-col justify-center items-center">
                <img src="/image-1.png" className="h-16 mb-4" />
                <h1 className="text-3xl text-black font-bold mb-3">
                    Ready to advance your career?
                </h1>
                <p className="text-gray-600 mb-6 text-[14px]">
                    Join thousands of professionals and companies already building their
                    network on Hariir.
                </p>
                <div className="flex justify-center gap-4 mb-10">
                    <button className="bg-[#FDC700] text-black px-4 py-2 rounded-[8px]  w-[128px] shadow-[1.5px 4px 4px 0px] text-[14px]">
                        Browse
                    </button>
                    <button className="w-[128px] text-[14px] border-2 border-[#FDC700] text-black px-4 py-2 rounded-[8px]">
                        Learn More
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Network