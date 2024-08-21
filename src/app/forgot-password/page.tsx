export default function ForgotPasswordPage() {
  return (
    <>
      <div className="font-[sans-serif] bg-stone-300 md:h-screen">
        <div className="flex items-center h-fit w-fit m-auto py-24">
          <div className="flex items-center md:p-8 p-6 bg-white h-full">
            <form className="max-w-lg w-full mx-auto" action="#">
              <div className="mb-12">
                <h1 className="text-stone-950 text-4xl font-extrabold">
                  Forgot your password?
                </h1>
              </div>
              <div>
                <p className="text-stone-950 text-center text-sm my-8">
                  Enter your email below and a code will be sent to your account
                </p>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full text-sm border-b border-stone-300 focus:border-stone-800 px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          data-original="#000000"
                        ></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="mt-12">
                <input
                  type="submit"
                  value="Send code"
                  className="w-full py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-950 hover:bg-stone-800 focus:outline-none"
                />
              </div>

              <div className="my-6 flex items-center">
                <hr className="w-full border-stone-300" />
              </div>
              <p className="text-stone-950 text-sm mt-4">
                Remember your password?{" "}
                <a
                  href="login"
                  className=" cursor-pointer text-stone-800 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Log in here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
