
import Image from "next/image";
import { useRouter } from "next/router";

const Network = () => {
    const router = useRouter();
    return (
        <div className="text-center pt-6 bg-cover bg-right-bottom md:bg-center bg-no-repeat min-h-[400px]"
            style={{
                backgroundImage: 'url("./Group4.png")',
                backgroundColor: "#FFFFFF66",
            }}
        >
            <div className="md:py-8 py-10 flex flex-col justify-center items-center">
                <Image
                    src="/image-1.png"
                    alt="Example"
                    width={64} // h-16 = 64px
                    height={64}
                    className="mb-4"
                />
                <h1 className="text-3xl text-black font-bold mb-3">
                    Ready to advance your career?
                </h1>
                <p className="text-gray-600 mb-6 text-[14px] ">
                    Join thousands of professionals and companies already building their
                    network on Hariir.
                </p>
                <div className="flex justify-center gap-4 md:mb-10 mb-6">
                    <button className="bg-[#FDC700] text-black px-4 py-2 rounded-[8px] w-[128px] shadow-[1.5px_2px_2px_0px] text-[14px] cursor-pointer 
                     transform transition-transform duration-300 hover:scale-105"
                        onClick={() => router.push("/dashboard")}
                    >
                        Browse
                    </button>
                    {/* <button className="cursor-pointer w-[128px] text-[14px] border-2 border-[#FDC700] text-black px-4 py-2 rounded-[8px] 
                     transform transition-transform duration-300 hover:scale-105">
                        Learn More
                    </button> */}
                </div>

            </div>

        </div>
    );
};

export default Network