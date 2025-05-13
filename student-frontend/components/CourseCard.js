// components/CourseCard.js
export default function CourseCard({ course }) {
  return (
    <div style={styles.card}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
  },
}
