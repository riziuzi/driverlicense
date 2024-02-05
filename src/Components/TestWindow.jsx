import React from 'react'
import { questions } from '../seedData'

export default function TestWindow() {

    return (
        <div>
            {questions.map((data, index) => (
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
            ))}
        </div>
    )
}
