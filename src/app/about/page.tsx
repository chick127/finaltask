'use client'
import React from 'react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold mb-5 text-orange-900">About</h1>
      <br />

      <div className="mb-10 px-4 sm:px-8 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="flex justify-center items-center order-first">
            <Image
              src="/마티3.png"
              alt="프로필 이미지"
              width={256}
              height={320}
              className="w-64 h-auto object-cover rounded-2xl shadow-xl md:w-80"
            />
          </div>

          <div className="w-90">
            <div className="h-auto bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
              <h1
                className="text-3xl font-extrabold mb-4 text-orange-900 border-b-2 border-gray-300 pb-2 
                            relative inline-block mr-1 p-1 rounded transition-colors duration-200 cursor-pointer 
                            after:absolute after:bottom-0 after:left-0 after:w-0 after:h-full after:bg-yellow-200 after:transition-all after:ease-in-out after:duration-300 hover:after:w-full"
              >
                <span className="relative z-10">About me</span>
              </h1>

              <div className="mt-4"></div>
              <p className="text-lg">이름: 허다현</p>
              <p className="text-lg">학과: 정보보호학 전공</p>
              <p className="text-lg">학번: 92410990</p>
              <p className="text-lg">
                <span className="mr-1">Github:</span>
                <a
                  href="https://github.com/chick127"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  https://github.com/chick127
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className="mb-10 px-4 sm:px-8 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div className="w-full order-last md:order-first">
            <div className="h-auto bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
              <h1
                className="text-3xl font-extrabold mb-4 text-orange-900 border-b-2 border-gray-300 pb-2 
                            relative inline-block mr-1 p-1 rounded transition-colors duration-200 cursor-pointer 
                            after:absolute after:bottom-0 after:left-0 after:w-0 after:h-full after:bg-yellow-200 after:transition-all after:ease-in-out after:duration-300 hover:after:w-full"
              >
                <span className="relative z-10">Skills</span>
              </h1>
              <ul className="list-disc list-inside space-y-1 text-lg">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Next.js</li>
              </ul>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-start items-start w-full order-first md:order-last">
            <div className="flex flex-col items-center peer">
              <img
                src="/마티4.png"
                alt="Skills 이미지"
                className="w-52 h-72 object-cover rounded-2xl shadow-xl z-10 md:w-60 md:h-80"
              />

              <p className="mt-4 text-lg font-semibold text-orange-900 text-center">
                이 캐릭터에 마우스를 가져다 대보세요!
              </p>
            </div>

            <Image
              src="/말풍선.png"
              alt="말풍선"
              width={288}
              height={200}
              className="absolute hidden peer-hover:block z-50
                        transition-opacity duration-300 opacity-0 peer-hover:opacity-100
                        w-72 md:w-96
                        // 모바일: 중앙 정렬 유지
                        left-1/2 -translate-x-1/2 top-1/2
                        // MD 이상: 오른쪽으로 이동
                        md:left-[60%] md:-translate-x-0 md:top-1/2"
            />
          </div>
        </div>
      </div>
    </>
  )
}
