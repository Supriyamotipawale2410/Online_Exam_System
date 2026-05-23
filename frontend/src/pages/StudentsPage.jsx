import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

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

        axios.get('http://127.0.0.1:5000/admin/students')
        .then((response) => {

            setStudents(response.data);

        });

    };

    const deleteStudent = (id) => {

        axios.delete(
            `http://127.0.0.1:5000/admin/delete-student/${id}`
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

            `http://127.0.0.1:5000/admin/update-student/${id}`,

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

            <div style={{padding:'30px'}}>

                <h1>Student Management</h1>

                <input
                    type="text"
                    placeholder="Search Student"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding:'10px',
                        width:'300px',
                        marginBottom:'20px'
                    }}
                />

                <br />

                <a href="http://127.0.0.1:5000/admin/download-students">

                    <button
                        style={{
                            padding:'10px 20px',
                            marginBottom:'20px'
                        }}
                    >
                        Download Students Excel
                    </button>

                </a>

                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        width:'100%',
                        borderCollapse:'collapse'
                    }}
                >

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
                                                    onClick={() => updateStudent(student.id)}
                                                >
                                                    Save
                                                </button>

                                            ) : (

                                                <button
                                                    onClick={() => editStudent(student)}
                                                >
                                                    Edit
                                                </button>

                                            )
                                        }

                                        <button
                                            onClick={() => deleteStudent(student.id)}
                                            style={{marginLeft:'10px'}}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default StudentsPage;