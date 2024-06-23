"use client";
import { CandidatureContext } from "@/app/candidature/page";
import { useContext } from "react";
export default function FormProgressBar() {
    const context = useContext(CandidatureContext);

    const { step } = context ? context : { step: 1 };

    const activeBubble = "p-2 size-8 flex  justify-center items-center aspect-square rounded-full text-white bg-gradient-to-tr from-blue-i to-green-i"
    const inactiveBubble = "p-2 size-8 flex justify-center items-center aspect-square rounded-full border border-gray-500 text-gray-500 text-xl"
    const activeLine = " w-full h-0.5  bg-blue-i  hover:mx-0 transition-all "
    const inactiveLine = " w-5/6 h-0.5  bg-gray-500 bg-opacity-50  hover:mx-0 transition-all "

    return (

        <div className="w-full px-10 py-4   flex justify-center items-center">
            <div className={activeBubble}>
                <span>1</span>
            </div>

            {
                (step > 1 ?

                    <>
                        <div className="flex-grow flex justify-center">
                            <div className={activeLine} />
                        </div>
                        <div className={activeBubble}>
                            <span>2</span>
                        </div>
                    </>
                    :
                    <>

                        <div className="flex-grow flex justify-center">
                            <div className={inactiveLine} />
                        </div>
                        <div className={inactiveBubble}>
                            <span>2</span>
                        </div>
                    </>
                )
            }
            {
                (step > 2 ?

                    <>
                        <div className="flex-grow flex justify-center">
                            <div className={activeLine} />
                        </div>
                        <div className={activeBubble}>
                            <span>3</span>
                        </div>
                    </>
                    :
                    <>

                        <div className="flex-grow flex justify-center">
                            <div className={inactiveLine} />
                        </div>
                        <div className={inactiveBubble}>
                            <span>3</span>
                        </div>
                    </>
                )
            }

        </div>
    );
}