import React, { useEffect, useState } from "react";
import StudentList from "./StudentList";

const StudentsList = () => {
  const [sData, setSData] = useState([]);
  console.log(sData);
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/students/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setSData(records);
    }
    getRecords();
    return;
  }, [sData.length]);

  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/students/${id}`, {
      method: "DELETE",
    });
    const newRecords = sData.filter((el) => el._id !== id);
    setSData(newRecords);
  }
  function recordList() {
    return sData.map((record) => {
      return (
        <StudentList
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  return (
    <>
      <h3 className="text-lg font-semibold p-4 w-1/2 m-auto">
        Students Records
      </h3>
      <div className="border rounded-lg overflow-hidden w-1/2 m-auto">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  City
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Category
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">{recordList()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentsList;
