import DataTable from '../components/DataTable';

const userColumns = [
  { key: 'id', label: 'ID' },
  { key: 'email', label: 'Email' },
  { key: 'first_name', label: 'First Name' },
  { key: 'last_name', label: 'Last Name' },
  { key: 'created_at', label: 'Created At' },
];

const teacherColumns = [
  { key: 'id', label: 'Teacher ID' },
  { key: 'user_id', label: 'User ID' },
  { key: 'email', label: 'Email' },
  { key: 'university_name', label: 'University' },
  { key: 'gender', label: 'Gender' },
  { key: 'year_joined', label: 'Year Joined' },
];

export default function TablesPage({ users, teachers }) {
  return (
    <div className="table-stack">
      <DataTable title="Users Table" columns={userColumns} rows={users} emptyMessage="No users found yet." />
      <DataTable title="Teachers Table" columns={teacherColumns} rows={teachers} emptyMessage="No teacher profiles found yet." />
    </div>
  );
}
