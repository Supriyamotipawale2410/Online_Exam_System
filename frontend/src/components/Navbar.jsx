import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem('role');

    const logout = () => {

        localStorage.clear();

        navigate('/');

    };

    return (

        <div
            style={{
                background:'#222',
                padding:'15px',
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center'
            }}
        >

            <h2 style={{color:'white'}}>
                Online Exam System
            </h2>

            <div>

                {
                    role === 'admin' && (

                        <>
                            <Link
                                to="/admin-dashboard"
                                style={{
                                    color:'white',
                                    marginRight:'20px',
                                    textDecoration:'none'
                                }}
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/upload"
                                style={{
                                    color:'white',
                                    marginRight:'20px',
                                    textDecoration:'none'
                                }}
                            >
                                Upload
                            </Link>

                            <Link
                                to="/results"
                                style={{
                                    color:'white',
                                    marginRight:'20px',
                                    textDecoration:'none'
                                }}
                            >
                                Results
                            </Link>
                        </>

                    )
                }

                {
                    role === 'student' && (

                        <Link
                            to="/subjects"
                            style={{
                                color:'white',
                                marginRight:'50px',
                                textDecoration:'none'
                            }}
                        >
                            Subjects
                        </Link>

                    )
                }
                <button onClick={() => navigate('/papers')}>
                    Tests
                </button>
                
                <button
                    onClick={logout}
                    style={{
                        padding:'8px 15px',
                        cursor:'pointer'
                    }}
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Navbar;