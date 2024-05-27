import React from 'react';
import PropTypes from 'prop-types';

const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.headerContainer}>
                <div style={styles.logo}>
                    <h1>Bienvenido a NotiFutbol</h1>
                </div>
            </div>
        </header>
    );
}

const styles = {
    header: {
        backgroundColor: '#660708',
        padding:  '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#fff'
    },
    headerContainer: {
        width: '90%',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        display: 'flex',
        alignItems: 'center'
    }
}

const App = () => {
    return (
        <>
            <Header />
            <CardContainer />
        </>
    );
}

const CardContainer = () => {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        fetch('http://3.129.191.211/api/22907/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const cardContainerStyle = {
        display: 'flex',
        gap: '20px',
        padding: '20px',
        background: '#D3D3D3',
    };

    return (
        <div style={cardContainerStyle}>
            {posts.map(post => (
                <Card
                    key={post.id}
                    imagen={post.imagen}
                    titulo={post.titulo}
                    descripcion={post.descripcion}
                    autor={post.autor}
                    fecha={post.fecha}
                />
            ))}
        </div>
    );
}

const Card = ({ imagen, titulo, descripcion, autor, fecha }) => {
    const cardStyle = {
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
    };

    const imgStyle = {
        width: '100%',
        height: 'auto',
    };

    const contentStyle = {
        padding: '16px',
    };

    const h2Style = {
        fontSize: '1.5em',
        margin: '16px 0',
    };

    const pStyle = {
        fontSize: '1em',
        margin: '0 0 16px',
    };

    const authorDateStyle = {
        fontSize: '0.8em',
        color: '#555',
        margin: '0 0 16px',
    };

    return (
        <div style={cardStyle}>
            <img src={imagen} alt={titulo} style={imgStyle} />
            <div style={contentStyle}>
                <h2 style={h2Style}>{titulo}</h2>
                <p style={pStyle}>{descripcion}</p>
                <p style={authorDateStyle}>Autor: {autor}</p>
                <p style={authorDateStyle}>Fecha: {new Date(fecha).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

Card.propTypes = {
    imagen: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    autor: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
};

export default App;
