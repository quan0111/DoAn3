import React from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CVData {
  name: string;
  title: string;
  email: string;
  phone: string;
  about: string;
  experience: { company: string; role: string; duration: string }[];
  education: { school: string; degree: string; year: string }[];
  skills: string[];
  image?: string;
}

interface CVEditorProps {
  data: CVData;
  onUpdate: (section: string, value: any) => void;
}

const SortableItem: React.FC<{
  id: string;
  children: React.ReactNode;
}> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const CVEditor: React.FC<CVEditorProps> = ({ data, onUpdate }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndExperience = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = data.experience.findIndex((exp, index) => `exp-${index}` === active.id);
      const newIndex = data.experience.findIndex((exp, index) => `exp-${index}` === over.id);
      const items = Array.from(data.experience);
      const [reorderedItem] = items.splice(oldIndex, 1);
      items.splice(newIndex, 0, reorderedItem);
      onUpdate("experience", items);
    }
  };

  const handleDragEndEducation = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = data.education.findIndex((edu, index) => `edu-${index}` === active.id);
      const newIndex = data.education.findIndex((edu, index) => `edu-${index}` === over.id);
      const items = Array.from(data.education);
      const [reorderedItem] = items.splice(oldIndex, 1);
      items.splice(newIndex, 0, reorderedItem);
      onUpdate("education", items);
    }
  };

  const handleDragEndSkills = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = data.skills.findIndex((skill, index) => `skill-${index}` === active.id);
      const newIndex = data.skills.findIndex((skill, index) => `skill-${index}` === over.id);
      const items = Array.from(data.skills);
      const [reorderedItem] = items.splice(oldIndex, 1);
      items.splice(newIndex, 0, reorderedItem);
      onUpdate("skills", items);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <img
            src={data.image || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-green-100 shadow-sm"
          />
          <h1 className="text-3xl font-bold text-gray-800">
            <input
              value={data.name}
              onChange={(e) => onUpdate("name", e.target.value)}
              className="w-full text-center bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 transition-colors duration-200"
              placeholder="Tên"
            />
          </h1>
          <p className="text-gray-600 mt-2">
            <input
              value={data.title}
              onChange={(e) => onUpdate("title", e.target.value)}
              className="w-full text-center bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 transition-colors duration-200"
              placeholder="Chức danh"
            />
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">📋</span> Thông tin cá nhân
              </h2>
              <p className="mb-2">
                Email: 
                <input 
                  value={data.email} 
                  onChange={(e) => onUpdate("email", e.target.value)} 
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200" 
                  placeholder="Email" 
                />
              </p>
              <p className="mb-2">
                SĐT: 
                <input 
                  value={data.phone} 
                  onChange={(e) => onUpdate("phone", e.target.value)} 
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200" 
                  placeholder="Số điện thoại" 
                />
              </p>
              <p>
                Địa chỉ: 
                <input 
                  value="net/tencuban" 
                  onChange={(e) => onUpdate("address", e.target.value)} 
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200" 
                  placeholder="Địa chỉ" 
                />
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">🏆</span> Cấp bậc
              </h2>
              <p>
                Công nhân viên: 
                <input 
                  value="Mới tốt nghiệp" 
                  onChange={(e) => onUpdate("level", e.target.value)} 
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200" 
                  placeholder="Cấp bậc" 
                />
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">📜</span> Chứng chỉ
              </h2>
              <p className="mb-2">2016 - PHP, MySQL, JavaScript</p>
              <p>2017 - React, Node.js</p>
            </div>
            <div className="p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">🎓</span> Học vấn
              </h2>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndEducation}>
                <SortableContext items={data.education.map((_, index) => `edu-${index}`)} strategy={verticalListSortingStrategy}>
                  {data.education.map((edu, index) => (
                    <SortableItem key={index} id={`edu-${index}`}>
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                        <input
                          value={edu.school}
                          onChange={(e) =>
                            onUpdate("education", data.education.map((item, i) =>
                              i === index ? { ...item, school: e.target.value } : item
                            ))
                          }
                          className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
                          placeholder="Trường học"
                        />
                        <input
                          value={edu.degree}
                          onChange={(e) =>
                            onUpdate("education", data.education.map((item, i) =>
                              i === index ? { ...item, degree: e.target.value } : item
                            ))
                          }
                          className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
                          placeholder="Bằng cấp"
                        />
                        <input
                          value={edu.year}
                          onChange={(e) =>
                            onUpdate("education", data.education.map((item, i) =>
                              i === index ? { ...item, year: e.target.value } : item
                            ))
                          }
                          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
                          placeholder="Năm"
                        />
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">🖋️</span> Giới thiệu
              </h2>
              <textarea
                value={data.about}
                onChange={(e) => onUpdate("about", e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
                placeholder="Viết về bạn..."
                rows={4}
              />
            </div>
            <div className="p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">📅</span> Kinh nghiệm
              </h2>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndExperience}>
                <SortableContext items={data.experience.map((_, index) => `exp-${index}`)} strategy={verticalListSortingStrategy}>
                  {data.experience.map((exp, index) => (
                    <SortableItem key={index} id={`exp-${index}`}>
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                        <input
                          value={exp.company}
                          onChange={(e) =>
                            onUpdate("experience", data.experience.map((item, i) =>
                              i === index ? { ...item, company: e.target.value } : item
                            ))
                          }
                          className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
                          placeholder="Công ty/Chức vụ"
                        />
                        <input
                          value={exp.role}
                          onChange={(e) =>
                            onUpdate("experience", data.experience.map((item, i) =>
                              i === index ? { ...item, role: e.target.value } : item
                            ))
                          }
                          className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
                          placeholder="Mô tả"
                        />
                        <input
                          value={exp.duration}
                          onChange={(e) =>
                            onUpdate("experience", data.experience.map((item, i) =>
                              i === index ? { ...item, duration: e.target.value } : item
                            ))
                          }
                          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
                          placeholder="Thời gian"
                        />
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </div>
            <div className="p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">🏆</span> Cấp bậc
              </h2>
              <p>
                Công nhân viên: 
                <input 
                  value="Mới tốt nghiệp" 
                  onChange={(e) => onUpdate("level", e.target.value)} 
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200" 
                  placeholder="Cấp bậc" 
                />
              </p>
            </div>
            <div className="p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">🛠️</span> Kỹ năng
              </h2>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndSkills}>
                <SortableContext items={data.skills.map((_, index) => `skill-${index}`)} strategy={verticalListSortingStrategy}>
                  {data.skills.map((skill, index) => (
                    <SortableItem key={index} id={`skill-${index}`}>
                      <div className="mb-2 p-2 bg-gray-50 rounded-lg shadow-sm">
                        <input
                          value={skill}
                          onChange={(e) =>
                            onUpdate("skills", data.skills.map((s, i) =>
                              i === index ? e.target.value : s
                            ))
                          }
                          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
                          placeholder="Kỹ năng"
                        />
                      </div>
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVEditor;