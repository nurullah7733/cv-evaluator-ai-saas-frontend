"use client";

import { useState, useCallback, memo } from "react";
import { RefreshCcwDot, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getResumeFormData } from "../../lib/sessionHelper/sessionHelper";
import { useReAnalyzeResumeMutation } from "../../features/apiSlice";
import ReAnalysisLoader from "../loader/reAnalysisLoader";
import { useDispatch } from "react-redux";
import { setCreateResumeAnalysis } from "../../features/createResumeAnalysisSlice";
import { setReAnalysisLoading } from "../../features/reAnalysisLoadingSlice.js";
import { toast } from "react-toastify";
// Summary Section
const SummarySection = memo(({ original, improved, onChange }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-gray-900">Summary</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <p className="text-xs font-semibold text-gray-500 mb-2">ORIGINAL</p>
        <p className="text-sm text-gray-700">{original || "N/A"}</p>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs font-semibold text-blue-700 mb-2">IMPROVED</p>
        <Textarea
          value={improved}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm min-h-[120px] bg-white"
        />
      </div>
    </div>
  </div>
));
SummarySection.displayName = "SummarySection";

// Experience Section
const ExperienceSection = memo(
  ({ experiences, improvements, onChange, onAdd, onRemove }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Experience</h3>
        <Button
          type="button"
          onClick={onAdd}
          size="sm"
          variant="outline"
          className="text-xs text-gray-700"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Experience
        </Button>
      </div>

      {improvements.map((improvement, idx) => {
        const original =
          experiences?.[improvement?.jobIndex ?? improvement?.index ?? idx];

        return (
          <div key={idx} className="border rounded-lg p-4 relative">
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  ORIGINAL
                </p>
                {original && (
                  <>
                    <p className="font-semibold text-sm text-gray-700">
                      {original?.jobTitle || original?.name}
                    </p>
                    <p className="text-xs text-gray-700 mb-2">
                      {original?.company} • {original?.duration}
                    </p>
                    <ul className="space-y-1 text-xs text-gray-700">
                      {original?.responsibilities?.map((resp, i) => (
                        <li key={i} className="flex gap-2">
                          <span>•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-700 mb-3">
                  IMPROVED
                </p>

                <Input
                  value={
                    improvement?.afterTitle ||
                    original?.jobTitle ||
                    original?.name ||
                    ""
                  }
                  onChange={(e) => onChange(idx, "afterTitle", e.target.value)}
                  placeholder="Job Title"
                  className="mb-2 h-8 text-sm bg-white"
                />
                <Input
                  value={
                    improvement?.afterCompany || improvement?.company || ""
                  }
                  onChange={(e) =>
                    onChange(idx, "afterCompany", e.target.value)
                  }
                  placeholder="Company"
                  className="mb-2 h-8 text-sm bg-white"
                />
                <Input
                  value={improvement?.afterPeriod || original?.duration || ""}
                  onChange={(e) => onChange(idx, "afterPeriod", e.target.value)}
                  placeholder="Period (e.g., Jan 2020 - Present)"
                  className="mb-3 h-8 text-sm bg-white"
                />

                <div className="space-y-2">
                  {improvement?.afterBullets?.map((bullet, bulletIdx) => (
                    <div key={bulletIdx} className="flex gap-1">
                      <Textarea
                        value={bullet}
                        onChange={(e) =>
                          onChange(idx, "bullet", e.target.value, bulletIdx)
                        }
                        className="text-sm bg-white min-h-[60px] flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => onChange(idx, "removeBullet", bulletIdx)}
                        className="text-red-400 hover:text-red-600 p-1 h-8"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => onChange(idx, "addBullet")}
                    className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add Bullet
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
);
ExperienceSection.displayName = "ExperienceSection";

// Skills Section
const SkillsSection = memo(
  ({
    original,
    skills,
    onChange,
    onAddCategory,
    onRemoveCategory,
    onAddSkill,
    onRemoveSkill,
  }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Skills</h3>
        <Button
          type="button"
          onClick={onAddCategory}
          size="sm"
          variant="outline"
          className="text-xs text-gray-700"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-gray-500 mb-3">ORIGINAL</p>
          <div className="space-y-3">
            {typeof original === "object" && !Array.isArray(original) ? (
              Object.entries(original || {}).map(([cat, skills], idx) => (
                <div key={idx} className="flex gap-3">
                  <p className="text-xs font-semibold text-gray-700 min-w-[100px]">
                    {cat}:
                  </p>
                  <p className="text-xs text-gray-700">
                    {Array.isArray(skills) ? skills.join(", ") : skills}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-700">No skills found</p>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-blue-700 mb-3">IMPROVED</p>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {skills.map((catObj, catIdx) => (
              <div
                key={catIdx}
                className="bg-white rounded-lg p-3 border border-blue-100"
              >
                <div className="flex gap-3">
                  <div className="flex items-start gap-1 min-w-[120px]">
                    <Input
                      value={catObj?.category}
                      onChange={(e) =>
                        onChange(catIdx, "category", e.target.value)
                      }
                      className="text-xs font-semibold h-7"
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveCategory(catIdx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="flex-1 space-y-1">
                    {catObj?.skills?.map((skill, skillIdx) => (
                      <div key={skillIdx} className="flex items-center gap-1">
                        <Input
                          value={skill}
                          onChange={(e) =>
                            onChange(catIdx, "skill", e.target.value, skillIdx)
                          }
                          className="text-xs h-7 flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => onRemoveSkill(catIdx, skillIdx)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => onAddSkill(catIdx)}
                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      Add Skill
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
);
SkillsSection.displayName = "SkillsSection";

// Projects Section
const ProjectsSection = memo(
  ({
    original,
    projects,
    onChange,
    onAdd,
    onRemove,
    onAddTech,
    onRemoveTech,
  }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Projects</h3>
        <Button
          type="button"
          onClick={onAdd}
          size="sm"
          variant="outline"
          className="text-xs text-gray-700"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Project
        </Button>
      </div>

      {projects.map((proj, idx) => (
        <div key={idx} className="border rounded-lg p-4 relative">
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                ORIGINAL
              </p>
              <p className="text-sm text-gray-700">
                {original?.[idx]?.description || original?.[idx]?.desc || "N/A"}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-700 mb-2">
                IMPROVED
              </p>
              <div className="space-y-2">
                <Input
                  value={proj.name}
                  onChange={(e) => onChange(idx, "name", e.target.value)}
                  placeholder="Project Name"
                  className="h-8 text-sm bg-white"
                />
                <Textarea
                  value={proj.afterDesc || ""}
                  onChange={(e) => onChange(idx, "afterDesc", e.target.value)}
                  className="text-sm bg-white min-h-[80px]"
                  placeholder="Project description..."
                />
                <Input
                  value={proj.url || ""}
                  onChange={(e) => onChange(idx, "url", e.target.value)}
                  placeholder="Project URL (optional)"
                  className="h-8 text-sm bg-white"
                />

                {/* Technologies */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-700">
                    Technologies
                  </p>
                  {proj.tech?.map((technology, techIdx) => (
                    <div key={techIdx} className="flex items-center gap-1">
                      <Input
                        value={technology}
                        onChange={(e) =>
                          onChange(idx, "tech", e.target.value, techIdx)
                        }
                        placeholder="Technology name"
                        className="h-7 text-xs bg-white flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveTech(idx, techIdx)}
                        className="text-red-400 hover:text-red-600 p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => onAddTech(idx)}
                    className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add Technology
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
);
ProjectsSection.displayName = "ProjectsSection";

// Education Section
const EducationSection = memo(({ education, onChange, onAdd, onRemove }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-900">Education</h3>
      <Button
        type="button"
        onClick={onAdd}
        size="sm"
        variant="outline"
        className="text-xs text-gray-700"
      >
        <Plus className="h-3 w-3 mr-1" />
        Add Education
      </Button>
    </div>

    {education?.map((edu, idx) => (
      <div
        key={idx}
        className="bg-blue-50 border border-blue-200 rounded-lg p-3 relative"
      >
        <button
          type="button"
          onClick={() => onRemove(idx)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <div className="space-y-2">
          <Input
            value={edu?.degree}
            onChange={(e) => onChange(idx, "degree", e.target.value)}
            placeholder="Degree"
            className="h-8 text-sm bg-white"
          />
          <Input
            value={edu?.institution || ""}
            onChange={(e) => onChange(idx, "institution", e.target.value)}
            placeholder="Institution"
            className="h-8 text-sm bg-white"
          />
          <Input
            value={edu?.graduationYear || ""}
            onChange={(e) => onChange(idx, "graduationYear", e.target.value)}
            placeholder="Year"
            className="h-8 text-sm bg-white"
          />
        </div>
      </div>
    ))}
  </div>
));

EducationSection.displayName = "EducationSection";

// Certifications Section
const CertificationsSection = memo(
  ({ certifications, onChange, onAdd, onRemove }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Certifications</h3>
        <Button
          type="button"
          onClick={onAdd}
          size="sm"
          variant="outline"
          className="text-xs text-gray-700"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Certification
        </Button>
      </div>

      {certifications.map((cert, idx) => (
        <div
          key={idx}
          className="bg-blue-50 border border-blue-200 rounded-lg p-3 relative"
        >
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <div className="space-y-2">
            <Input
              value={cert.name}
              onChange={(e) => onChange(idx, "name", e.target.value)}
              placeholder="Certification Name"
              className="h-8 text-sm bg-white"
            />
            <Input
              value={cert.issuer || ""}
              onChange={(e) => onChange(idx, "issuer", e.target.value)}
              placeholder="Issuer"
              className="h-8 text-sm bg-white"
            />
            <Input
              value={cert.dateIssued || ""}
              onChange={(e) => onChange(idx, "dateIssued", e.target.value)}
              placeholder="Date Issued"
              className="h-8 text-sm bg-white"
            />
          </div>
        </div>
      ))}
    </div>
  )
);
CertificationsSection.displayName = "CertificationsSection";

// Awards Section
const AwardsSection = memo(({ awards, onChange, onAdd, onRemove }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-900">Awards</h3>
      <Button
        type="button"
        onClick={onAdd}
        size="sm"
        variant="outline"
        className="text-xs text-gray-700"
      >
        <Plus className="h-3 w-3 mr-1" />
        Add Award
      </Button>
    </div>

    {awards?.map((award, idx) => (
      <div
        key={idx}
        className="bg-blue-50 border border-blue-200 rounded-lg p-3 relative"
      >
        <button
          type="button"
          onClick={() => onRemove(idx)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <div className="space-y-2">
          <Input
            value={award?.title}
            onChange={(e) => onChange(idx, "title", e.target.value)}
            placeholder="Award Title"
            className="h-8 text-sm bg-white"
          />
          <Input
            value={award?.issuer || ""}
            onChange={(e) => onChange(idx, "issuer", e.target.value)}
            placeholder="Issuer"
            className="h-8 text-sm bg-white"
          />
          <Input
            value={award?.date || ""}
            onChange={(e) => onChange(idx, "date", e.target.value)}
            placeholder="Date"
            className="h-8 text-sm bg-white"
          />
        </div>
      </div>
    ))}
  </div>
));
AwardsSection.displayName = "AwardsSection";

// Main Component
const ReanalysisModal = ({ analysis }) => {
  const initializeSkills = () => {
    const skillsObj = analysis?.improvements?.skills?.afterGrouped || {};
    return Object.entries(skillsObj).map(([category, skills]) => ({
      category,
      skills: Array.isArray(skills) ? skills : [],
    }));
  };
  const dispatch = useDispatch();
  const [reAnalysisRequest, { isError }] = useReAnalyzeResumeMutation();

  const {
    analysisId,
    actor,
    desiredSalary,
    industry,
    jdText,
    persona,
    region,
    llmName,
  } = getResumeFormData() || {};
  const [editableData, setEditableData] = useState({
    summary: analysis?.improvements?.summary?.after || "",
    experience: analysis?.improvements?.experience || [],
    skills: initializeSkills(),
    projects: analysis?.improvements?.projects || [],
    education: analysis?.improvements?.education || [],
    certifications: analysis?.improvements?.certifications || [],
    awards: analysis?.improvements?.awards || [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Summary
  const handleSummaryChange = useCallback((value) => {
    setEditableData((prev) => ({ ...prev, summary: value }));
  }, []);

  // Experience handlers
  const handleExperienceChange = useCallback((idx, field, value, bulletIdx) => {
    setEditableData((prev) => {
      const updated = [...prev.experience];

      if (field === "bullet") {
        updated[idx].afterBullets[bulletIdx] = value;
      } else if (field === "addBullet") {
        updated[idx].afterBullets = [...(updated[idx]?.afterBullets || []), ""];
      } else if (field === "removeBullet") {
        updated[idx].afterBullets = updated[idx]?.afterBullets?.filter(
          (_, i) => i !== value
        );
      } else {
        updated[idx] = { ...updated[idx], [field]: value };
      }

      return { ...prev, experience: updated };
    });
  }, []);

  const handleAddExperience = useCallback(() => {
    setEditableData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          jobIndex: prev?.experience?.length,
          afterTitle: "",
          afterCompany: "",
          afterPeriod: "",
          afterBullets: [""],
        },
      ],
    }));
  }, []);

  const handleRemoveExperience = useCallback((idx) => {
    setEditableData((prev) => ({
      ...prev,
      experience: prev?.experience?.filter((_, i) => i !== idx),
    }));
  }, []);

  // Skills handlers
  const handleSkillsChange = useCallback((catIdx, field, value, skillIdx) => {
    setEditableData((prev) => {
      const updated = [...prev.skills];
      if (field === "category") {
        updated[catIdx] = { ...updated[catIdx], category: value };
      } else if (field === "skill") {
        const newSkills = [...updated[catIdx].skills];
        newSkills[skillIdx] = value;
        updated[catIdx] = { ...updated[catIdx], skills: newSkills };
      }
      return { ...prev, skills: updated };
    });
  }, []);

  const handleAddSkillCategory = useCallback(() => {
    setEditableData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        { category: `New Category ${prev?.skills?.length + 1}`, skills: [] },
      ],
    }));
  }, []);

  const handleRemoveSkillCategory = useCallback((idx) => {
    setEditableData((prev) => ({
      ...prev,
      skills: prev?.skills?.filter((_, i) => i !== idx),
    }));
  }, []);

  const handleAddSkill = useCallback((catIdx) => {
    setEditableData((prev) => {
      const updated = [...prev.skills];
      updated[catIdx] = {
        ...updated[catIdx],
        skills: [...updated[catIdx].skills, ""],
      };
      return { ...prev, skills: updated };
    });
  }, []);

  const handleRemoveSkill = useCallback((catIdx, skillIdx) => {
    setEditableData((prev) => {
      const updated = [...prev.skills];
      updated[catIdx] = {
        ...updated[catIdx],
        skills: updated[catIdx]?.skills?.filter((_, i) => i !== skillIdx),
      };
      return { ...prev, skills: updated };
    });
  }, []);

  // Projects handlers
  const handleProjectChange = useCallback((idx, field, value, techIdx) => {
    setEditableData((prev) => {
      const updated = [...prev.projects];

      if (field === "tech") {
        const newTech = [...(updated[idx].tech || [])];
        newTech[techIdx] = value;
        updated[idx] = { ...updated[idx], tech: newTech };
      } else {
        updated[idx] = { ...updated[idx], [field]: value };
      }

      return { ...prev, projects: updated };
    });
  }, []);

  const handleAddProject = useCallback(() => {
    setEditableData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { name: "", afterDesc: "", tech: [], url: "", impact: "" },
      ],
    }));
  }, []);

  const handleRemoveProject = useCallback((idx) => {
    setEditableData((prev) => ({
      ...prev,
      projects: prev?.projects?.filter((_, i) => i !== idx),
    }));
  }, []);

  const handleAddProjectTech = useCallback((projectIdx) => {
    setEditableData((prev) => {
      const updated = [...prev.projects];
      updated[projectIdx] = {
        ...updated[projectIdx],
        tech: [...(updated[projectIdx].tech || []), ""],
      };
      return { ...prev, projects: updated };
    });
  }, []);

  const handleRemoveProjectTech = useCallback((projectIdx, techIdx) => {
    setEditableData((prev) => {
      const updated = [...prev.projects];
      updated[projectIdx] = {
        ...updated[projectIdx],
        tech: (updated[projectIdx].tech || []).filter((_, i) => i !== techIdx),
      };
      return { ...prev, projects: updated };
    });
  }, []);

  // Education handlers
  const handleEducationChange = useCallback((idx, field, value) => {
    setEditableData((prev) => {
      const updated = [...prev.education];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, education: updated };
    });
  }, []);

  const handleAddEducation = useCallback(() => {
    setEditableData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", institution: "", graduationYear: "" },
      ],
    }));
  }, []);

  const handleRemoveEducation = useCallback((idx) => {
    setEditableData((prev) => ({
      ...prev,
      education: prev?.education?.filter((_, i) => i !== idx),
    }));
  }, []);

  // Certifications handlers
  const handleCertificationChange = useCallback((idx, field, value) => {
    setEditableData((prev) => {
      const updated = [...prev.certifications];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, certifications: updated };
    });
  }, []);

  const handleAddCertification = useCallback(() => {
    setEditableData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { name: "", issuer: "", dateIssued: "" },
      ],
    }));
  }, []);

  const handleRemoveCertification = useCallback((idx) => {
    setEditableData((prev) => ({
      ...prev,
      certifications: prev?.certifications?.filter((_, i) => i !== idx),
    }));
  }, []);

  // Awards handlers
  const handleAwardChange = useCallback((idx, field, value) => {
    setEditableData((prev) => {
      const updated = [...prev.awards];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, awards: updated };
    });
  }, []);

  const handleAddAward = useCallback(() => {
    setEditableData((prev) => ({
      ...prev,
      awards: [...prev.awards, { title: "", issuer: "", date: "" }],
    }));
  }, []);

  const handleRemoveAward = useCallback((idx) => {
    setEditableData((prev) => ({
      ...prev,
      awards: prev?.awards?.filter((_, i) => i !== idx),
    }));
  }, []);

  const handleReanalysis = useCallback(async () => {
    const skillsObj = {};
    editableData?.skills?.forEach((item) => {
      skillsObj[item.category] = item?.skills;
    });

    const dataToSend = {
      ...editableData,
      skills: { afterGrouped: skillsObj },
    };

    const prevImprovements = dataToSend;

    const formData = { prevImprovements };
    formData.analysisId = analysisId;
    formData.jdText = jdText || "";
    formData.region = region || "";
    formData.industry = industry || "";
    formData.actor = actor || "";
    formData.persona = persona || "";
    formData.desiredSalary = desiredSalary || "";
    formData.llmName = llmName || "";

    setIsModalOpen(false);
    dispatch(setReAnalysisLoading(true));
    const result = await reAnalysisRequest(formData);
    dispatch(setReAnalysisLoading(false));

    if (!isError) {
      dispatch(setCreateResumeAnalysis(result?.data));
    } else {
      toast.error("Something went wrong. Please Re-analysis again.");
    }
  }, [editableData]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white mt-4">
          <RefreshCcwDot className="h-4 w-4 mr-2" />
          Reanalysis Resume
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden [&>button]:text-gray-800 [&>button]:hover:text-gray-800">
        <div className="p-3 border-b sticky top-0 bg-white z-10">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-blue-600">
              <RefreshCcwDot className="h-6 w-6 text-blue-600" />
              Review & Reanalyze Resume
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-1">
              Review and edit all sections before reanalysis
            </p>
          </DialogHeader>
        </div>

        <div
          className="overflow-y-auto px-6 py-4"
          style={{ maxHeight: "calc(90vh - 200px)" }}
        >
          <div className="space-y-6">
            <SummarySection
              original={analysis?.resumeSections?.summary?.content}
              improved={editableData?.summary}
              onChange={handleSummaryChange}
            />

            <ExperienceSection
              experiences={analysis?.resumeSections?.experience}
              improvements={editableData?.experience}
              onChange={handleExperienceChange}
              onAdd={handleAddExperience}
              onRemove={handleRemoveExperience}
            />

            <SkillsSection
              original={analysis?.resumeSections?.skills}
              skills={editableData?.skills}
              onChange={handleSkillsChange}
              onAddCategory={handleAddSkillCategory}
              onRemoveCategory={handleRemoveSkillCategory}
              onAddSkill={handleAddSkill}
              onRemoveSkill={handleRemoveSkill}
            />

            <ProjectsSection
              original={analysis?.resumeSections?.projects}
              projects={editableData?.projects}
              onChange={handleProjectChange}
              onAdd={handleAddProject}
              onRemove={handleRemoveProject}
              onAddTech={handleAddProjectTech}
              onRemoveTech={handleRemoveProjectTech}
            />

            <EducationSection
              education={editableData?.education}
              onChange={handleEducationChange}
              onAdd={handleAddEducation}
              onRemove={handleRemoveEducation}
            />

            <CertificationsSection
              certifications={editableData?.certifications}
              onChange={handleCertificationChange}
              onAdd={handleAddCertification}
              onRemove={handleRemoveCertification}
            />

            <AwardsSection
              awards={editableData?.awards}
              onChange={handleAwardChange}
              onAdd={handleAddAward}
              onRemove={handleRemoveAward}
            />
          </div>
        </div>

        <div className="p-6 border-t bg-white flex items-center justify-between sticky bottom-0">
          <p className="text-sm text-gray-600">
            Review all changes before reanalysis
          </p>
          <div className="flex gap-3">
            <DialogTrigger asChild>
              <Button type="button" variant="outline" className="text-gray-700">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </DialogTrigger>
            <Button
              type="button"
              onClick={handleReanalysis}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RefreshCcwDot className="h-4 w-4 mr-2" />
              Reanalyze Resume
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReanalysisModal;
