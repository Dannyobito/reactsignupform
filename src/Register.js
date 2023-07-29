import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const Register = () => {
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const userRef = useRef();
    const errRef = useRef();

    const [user , setUser] = useState('');
    const [validName,setValidName] = useState(false);

    const [pwd , setPwd] = useState('');
    const [validPwd,setValidPwd] = useState(false);

    const [matchPwd , setMatchPwd] = useState('');
    const [validMatch,setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=> {
        userRef.current.focus();
    },[]);

    useEffect(()=> {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    },[user]);

    useEffect(()=> {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    },[pwd, matchPwd]);

    useEffect(()=> {
        setErrMsg('');
    },[user, pwd, matchPwd])
    const handleSubmit = (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2) {
            setErrMsg("Ïnvalid Entry");
            return
        }
        else{
            console.log(user,pwd);
            setSuccess(true)
        }

    }
    
    return(
        <> 
        { success ?
        <div>
            <p>Signup Successful</p>
            <a href="#">Sign In</a>
        </div>
        :<div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                        />
                        <p className = {user && !validName ?"instructions" :"offscreen"} >Input of 4-24 characters <br/> Hyphen and undescore only are allowed</p>
                        <label htmlFor="pwd">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="pwd"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <p className = {pwd && !validPwd ?"instructions" :"offscreen"} >Input of 8-24 characters <br/> Must contain capital letter, small letter number and a special character</p>
                        <label htmlFor="pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd &&validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                        />
                        <p className = {matchPwd && !validMatch ?"instructions" :"offscreen"} >Must match password</p>
                        <button disabled = {!validName || !validPwd ||!validMatch}>Sign Up</button>
                    </form>
        </div>
    }
    </>
    )
}
export default Register;