import React from 'react'
import { questions } from '../seedData'
import { Nav } from './Navbars/Navbars'
import Main from './TakeTest/Main'

export default function TestWindow() {
    return (
        <div>
            <Nav />
            {/* {questions.map((data, index) => (
                <div className="main" key={index}>
                    <div className="question">
                        {data.question}
                    </div>
                    {data.options.map((option, ind)=>(
                        <div className="option" key={ind}>
                            {option.option}
                        </div>
                    ))}
                </div>
            ))} */}
            <Main />
            <div className="header h-24 border border-red-500 w-full"></div>
        </div>
    )
}
