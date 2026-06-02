import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/students.css';

function StudentsPage() {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [editingStudent, setEditingStudent] = useState(null);

    const [formData, setFormData] = useState({

        student_name:'',
        email:'',
        city:'',
        phone:'',
        gender:''

    });

    useEffect(() => {

        fetchStudents();

    }, []);

    const fetchStudents = () => {

        axios.get('http://https://online-exam-system-00a8.onrender.com/admin/students')
        .then((response) => {

            setStudents(response.data);

        });

    };

    const deleteStudent = (id) => {

        axios.delete(
            `http://https://online-exam-system-00a8.onrender.com/admin/delete-student/${id}`
        )
        .then(() => {

            alert('Student Deleted');

            fetchStudents();

        });

    };

    const editStudent = (student) => {

        setEditingStudent(student.id);

        setFormData({

            student_name: student.student_name,
            email: student.email,
            city: student.city,
            phone: student.phone,
            gender: student.gender

        });

    };

    const updateStudent = (id) => {

        axios.put(

            `http://https://online-exam-system-00a8.onrender.com/admin/update-student/${id}`,

            formData

        )
        .then(() => {

            alert('Student Updated');

            setEditingStudent(null);

            fetchStudents();

        });

    };

    const filteredStudents = students.filter((student) =>

        student.student_name
        .toLowerCase()
        .includes(search.toLowerCase())

    );

    return (

        <>

            <Navbar />

            <div className="students-container">

                <div className="students-header">

                    <h1 className="students-title">
                        Student Management
                    </h1>

                    <a href="http://https://online-exam-system-00a8.onrender.com/admin/download-students">

                        <button className="download-btn">
                            Download Excel
                        </button>

                    </a>

                </div>
                🔍
                <input
                    
                    type="text"
                    placeholder="Search Student"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />

                <div className="table-wrapper">

                    <table className="students-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                filteredStudents.map((student) => (

                                    <tr key={student.id}>

                                        <td>{student.student_id}</td>

                                        <td>

                                            {
                                                editingStudent === student.id ? (

                                                    <input
                                                        className="edit-input"
                                                        value={formData.student_name}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                student_name:e.target.value
                                                            })
                                                        }
                                                    />

                                                ) : (

                                                    student.student_name

                                                )
                                            }

                                        </td>

                                        <td>

                                            {
                                                editingStudent === student.id ? (

                                                    <input
                                                        className="edit-input"
                                                        value={formData.email}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                email:e.target.value
                                                            })
                                                        }
                                                    />

                                                ) : (

                                                    student.email

                                                )
                                            }

                                        </td>

                                        <td>

                                            {
                                                editingStudent === student.id ? (

                                                    <input
                                                        className="edit-input"
                                                        value={formData.city}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                city:e.target.value
                                                            })
                                                        }
                                                    />

                                                ) : (

                                                    student.city

                                                )
                                            }

                                        </td>

                                        <td>

                                            {
                                                editingStudent === student.id ? (

                                                    <input
                                                        className="edit-input"
                                                        value={formData.phone}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                phone:e.target.value
                                                            })
                                                        }
                                                    />

                                                ) : (

                                                    student.phone

                                                )
                                            }

                                        </td>

                                        <td>

                                            {
                                                editingStudent === student.id ? (

                                                    <input
                                                        className="edit-input"
                                                        value={formData.gender}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                gender:e.target.value
                                                            })
                                                        }
                                                    />

                                                ) : (

                                                    student.gender

                                                )
                                            }

                                        </td>

                                        <td>

                                            {
                                                editingStudent === student.id ? (

                                                    <button
                                                        className="save-btn"
                                                        onClick={() => updateStudent(student.id)}
                                                    >
                                                        Save
                                                    </button>

                                                ) : (

                                                    <button
                                                        className="edit-btn"
                                                        onClick={() => editStudent(student)}
                                                    >
                                                        Edit ✏️
                                                    </button>

                                                )
                                            }

                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteStudent(student.id)}
                                            >
                                                Delete 🗑️
                                            </button>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default StudentsPage;