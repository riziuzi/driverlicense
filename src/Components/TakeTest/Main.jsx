import React, { useEffect, useState } from 'react'
import { questions } from '../../seedData'


const checkerFunc = ({ questionstate = null } = {}) => {
    let arr = [];
    console.log(questionstate)
    questionstate?.map((question, index1) => {
        let CorrectFlag = true;
        let AttemptedFlag = false;
        question?.options?.map((option, index2) => {
            if (option.correct && !option.selected || !option.correct && option.selected) {
                CorrectFlag = false;
            }
            if (option.selected) {
                AttemptedFlag = true;
            }
        });
        arr.push({ Correct: CorrectFlag, Attempted: AttemptedFlag }); // Corrected line
    });
    console.log(arr);
    return arr;
};

export default function Main() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionstate, setquestionstate] = useState(null)
    useEffect(() => {
        setquestionstate([...questions])
    }, [])
    const currentQuestion = questionstate && questionstate[currentQuestionIndex];
    const handleOptionClick = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questionstate];
        updatedQuestions[questionIndex].options[optionIndex].selected = !updatedQuestions[questionIndex].options[optionIndex].selected;
        setquestionstate(updatedQuestions);
        console.log(questionstate)
    };
    const handleOnSubmit = () => {
        checkerFunc({ questionstate })
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="left flex flex-col items-center border border-red-500 w-3/4">
                <div className="timer">timer</div>
            </div>
            <div className="center flex flex-col items-center border border-red-500 w-3/4">
                <div className="question mb-5">Q) {currentQuestion?.question}</div>
                <div className="options grid grid-cols-2 gap-3">
                    {currentQuestion?.options?.map((opt, index) => (
                        <button className={`option border border-red-400 ${opt.selected ? ("bg-green-400") : ("")}`} key={index} onClick={() => { handleOptionClick(currentQuestionIndex, index) }}>
                            {opt.option}
                        </button>
                    ))}
                </div>
                {currentQuestionIndex === questionstate?.length - 1 ? (<><button onClick={() => { handleOnSubmit() }}>Submit</button></>) : (<button className="next" onClick={(prev) => { setCurrentQuestionIndex(prev => (prev < questionstate?.length - 1 ? (prev + 1) : (prev))) }}>
                    Next
                </button>)}
                <button className="prev" onClick={() => { setCurrentQuestionIndex(prev => (prev > 0 ? (prev - 1) : (prev))) }}>
                    Previous
                </button>
            </div>

            <div className="left flex justify-around border border-blue-500 w-1/4">
                {questionstate?.map((question, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={index === currentQuestionIndex ? "activeIndex" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}
