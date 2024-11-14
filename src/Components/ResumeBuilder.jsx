import React, { useState } from 'react';
import axios from 'axios';
import './ResumeBuilder.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import Template from './Template'; 
const ResumeBuilder = () => {
  const [jobRole, setJobRole] = useState('');
  const [sections, setSections] = useState({
    personalDetails: false,
    professionalSummary: false,
    skills: false,
    experience: false,
    education: false,
    
    
  });

  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [professionalSummary, setProfessionalSummary] = useState('');
  const [skills, setSkills] = useState(['']);
  const [experiences, setExperiences] = useState([{ jobTitle: '', company: '', duration: '', description: '' }]);
  const [educations, setEducations] = useState([{ degree: '', university: '', year: '' }]);
  const [projects, setProjects] = useState([{ projectName: '', description: '', link: '' }]);
  const [certifications, setCertifications] = useState([{ certificationName: '', issuingOrganization: '', year: '' }]);
  const [languages, setLanguages] = useState(['']);
  const [hobbies, setHobbies] = useState(['']);
  const [awards, setAwards] = useState([{ awardName: '', year: '' }]);
  const [volunteerExperiences, setVolunteerExperiences] = useState([{ role: '', organization: '', duration: '', description: '' }]);
  const [publications, setPublications] = useState([{ title: '', publisher: '', year: '' }]);
  const [professionalMemberships, setProfessionalMemberships] = useState([{ organization: '', role: '' }]);
  const [references, setReferences] = useState([{ name: '', contactInfo: '', relationship: '' }]);
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [links, setLinks] = useState([{ label: '', url: '' }]);
  const [socialMedia, setSocialMedia] = useState([{ platform: '', url: '' }]);

  const [generatedResume, setGeneratedResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const handleSectionToggle = (section) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedResume('');
  
    // Building the prompt as per the required format
    const prompt = `
      You are a highly skilled AI Resume Generator. Given the following details, generate a professional and compelling resume.
      Enhance the text to make it sound polished and tailored for a software engineering position. The resume should be well-structured,
      highlighting the strengths of the individual, and demonstrating clear and concise achievements.
  
      Here are the details:
      Name: ${personalDetails.name}
      Email: ${personalDetails.email}
      Phone: ${personalDetails.phone}
      Address: ${personalDetails.address}
      
      Professional Summary: - ${professionalSummary}
      
      Skills: - ${skills.join(', ')}
      
      Experience: - ${experiences.map(exp => `${exp.jobTitle} at ${exp.company} (${exp.duration}): ${exp.description}`).join('\n- ')}
      
      Education: - ${educations.map(ed => `${ed.degree} from ${ed.university} (${ed.year})`).join('\n- ')}
      
      Certifications: - ${certifications.map(cert => `${cert.certificationName} from ${cert.issuingOrganization} (${cert.year})`).join('\n- ')}
      
      Languages: - ${languages.join(', ')}
      
      Awards: - ${awards.map(award => `${award.awardName} (${award.year})`).join('\n- ')}
      
      Volunteer Experience: - ${volunteerExperiences.map(vol => `${vol.role} at ${vol.organization} (${vol.duration}): ${vol.description}`).join('\n- ')}
      
      Publications: - ${publications.map(pub => `${pub.title} published by ${pub.publisher} (${pub.year})`).join('\n- ')}
      
      Professional Memberships: - ${professionalMemberships.map(mem => `${mem.organization} (${mem.role})`).join('\n- ')}
      
      References: - ${references.map(ref => `${ref.name} (${ref.contactInfo}, Relationship: ${ref.relationship})`).join('\n- ')}
      
      Additional Information: - ${additionalInformation}
      
      Links: - ${links.map(link => `${link.label}: ${link.url}`).join('\n- ')}
      
      Social Media: - ${socialMedia.map(social => `${social.platform}: ${social.url}`).join('\n- ')}
      
      Instructions:
      - Make sure to create a resume that is tailored for a job in Software Engineering, highlighting the applicant’s technical skills, experience, and professional achievements.
      - Use professional and formal language.
      - Organize the resume clearly, with headings and bullet points where appropriate.
      - If any details are missing or ambiguous, make reasonable assumptions to fill in the gaps.
      - Enhance any underwhelming descriptions to sound more impactful and achievement-oriented.
      - Focus on clarity and readability, making the resume concise and effective.
    `;
  
    try {
      // Make the API request to Google Gemini
      const response = await axios.post('https://gemini.googleapis.com/v1/generations:generateText', {
        prompt: prompt, // Use the same prompt format
        model: 'google/gemini-1.0', // Gemini model, adjust as necessary
        max_output_tokens: 1024, // Token limit, adjust as needed
      }, {
        headers: {
          'Authorization': `Bearer ${googleApiKey}`, // Use your Google API key here
          'Content-Type': 'application/json', // Ensure correct content type
        }
      });
  
      // Assuming the response format is similar to OpenAI's
      setGeneratedResume(response.data.generated_text || ''); // Adjust if needed based on Gemini's response structure
    } catch (err) {
      console.error(err);
      setError('Error generating resume');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
    <div className="resume-builder">
      <h1>Resume Builder</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Job Role:
          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
        </label>

        

        {/* Toggle Sections */}
        <div className="section-toggle">
          {Object.keys(sections).map((section) => (
            <div key={section}>
              <label>
                <input
                  type="checkbox"
                  checked={sections[section]}
                  onChange={() => handleSectionToggle(section)}
                />
                {section.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </label>
            </div>
          ))}
        </div>

        {/* Sections for inputs */}
        {sections.personalDetails && (
          <div>
            <h3>Personal Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={personalDetails.name}
              onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={personalDetails.email}
              onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={personalDetails.phone}
              onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={personalDetails.address}
              onChange={(e) => setPersonalDetails({ ...personalDetails, address: e.target.value })}
            />
          </div>
        )}

        {sections.professionalSummary && (
          <div>
            <h3>Professional Summary</h3>
            <textarea
              value={professionalSummary}
              onChange={(e) => setProfessionalSummary(e.target.value)}
              placeholder="Write your professional summary"
            />
          </div>
        )}

        {sections.skills && (
          <div>
            <h3>Skills</h3>
            {skills.map((skill, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => {
                    const newSkills = [...skills];
                    newSkills[index] = e.target.value;
                    setSkills(newSkills);
                  }}
                  placeholder="Skill"
                />
                <button type="button" onClick={() => setSkills(skills.filter((_, i) => i !== index))}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => setSkills([...skills, ''])}>Add Skill</button>
          </div>
        )}

        {sections.experience && (
          <div>
            <h3>Experience</h3>
            {experiences.map((exp, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[index].jobTitle = e.target.value;
                    setExperiences(newExperiences);
                  }}
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[index].company = e.target.value;
                    setExperiences(newExperiences);
                  }}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[index].duration = e.target.value;
                    setExperiences(newExperiences);
                  }}
                />
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[index].description = e.target.value;
                    setExperiences(newExperiences);
                  }}
                />
                <button type="button" onClick={() => setExperiences(experiences.filter((_, i) => i !== index))}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setExperiences([...experiences, { jobTitle: '', company: '', duration: '', description: '' }])}>Add Experience</button>
          </div>
        )}

        {sections.education && (
          <div>
            <h3>Education</h3>
            {educations.map((ed, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Degree"
                  value={ed.degree}
                  onChange={(e) => {
                    const newEducations = [...educations];
                    newEducations[index].degree = e.target.value;
                    setEducations(newEducations);
                  }}
                />
                <input
                  type="text"
                  placeholder="University"
                  value={ed.university}
                  onChange={(e) => {
                    const newEducations = [...educations];
                    newEducations[index].university = e.target.value;
                    setEducations(newEducations);
                  }}
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={ed.year}
                  onChange={(e) => {
                    const newEducations = [...educations];
                    newEducations[index].year = e.target.value;
                    setEducations(newEducations);
                  }}
                />
                <button type="button" onClick={() => setEducations(educations.filter((_, i) => i !== index))}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => setEducations([...educations, { degree: '', university: '', year: '' }])}>Add Education</button>
          </div>
        )}

        {sections.projects && (
          <div>
            <h3>Projects</h3>
            {projects.map((project, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Project Name"
                  value={project.projectName}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].projectName = e.target.value;
                    setProjects(newProjects);
                  }}
                />
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].description = e.target.value;
                    setProjects(newProjects);
                  }}
                />
                <input
                  type="text"
                  placeholder="Project Link"
                  value={project.link}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].link = e.target.value;
                    setProjects(newProjects);
                  }}
                />
                <button type="button" onClick={() => setProjects(projects.filter((_, i) => i !== index))}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => setProjects([...projects, { projectName: '', description: '', link: '' }])}>Add Project</button>
          </div>
        )}

{sections.languages && (
  <div>
    <h3>Languages</h3>
    {languages.map((language, index) => (
      <div key={index}>
        <input
          type="text"
          value={language}
          onChange={(e) => {
            const newLanguages = [...languages];
            newLanguages[index] = e.target.value;
            setLanguages(newLanguages);
          }}
          placeholder="Language"
        />
        <button type="button" onClick={() => {
          const newLanguages = languages.filter((_, i) => i !== index);
          setLanguages(newLanguages);
        }}>
          Remove
        </button>
      </div>
    ))}
    <button type="button" onClick={() => setLanguages([...languages, ''])}>Add Language</button>
  </div>
)}

{sections.hobbies && (
  <div>
    <h3>Hobbies</h3>
    {hobbies.map((hobby, index) => (
      <div key={index}>
        <input
          type="text"
          value={hobby}
          onChange={(e) => {
            const newHobbies = [...hobbies];
            newHobbies[index] = e.target.value;
            setHobbies(newHobbies);
          }}
          placeholder="Hobby"
        />
        <button type="button" onClick={() => {
          const newHobbies = hobbies.filter((_, i) => i !== index);
          setHobbies(newHobbies);
        }}>
          Remove
        </button>
      </div>
    ))}
    <button type="button" onClick={() => setHobbies([...hobbies, ''])}>Add Hobby</button>
  </div>
)}

{sections.awards && (
  <div>
    <h3>Awards</h3>
    {awards.map((award, index) => (
      <div key={index}>
        <input
          type="text"
          value={award.awardName}
          onChange={(e) => {
            const newAwards = [...awards];
            newAwards[index].awardName = e.target.value;
            setAwards(newAwards);
          }}
          placeholder="Award Name"
        />
        <input
          type="text"
          value={award.year}
          onChange={(e) => {
            const newAwards = [...awards];
            newAwards[index].year = e.target.value;
            setAwards(newAwards);
          }}
          placeholder="Year"
        />
        <button type="button" onClick={() => {
          const newAwards = awards.filter((_, i) => i !== index);
          setAwards(newAwards);
        }}>
          Remove
        </button>
      </div>
    ))}
    <button type="button" onClick={() => setAwards([...awards, { awardName: '', year: '' }])}>Add Award</button>
  </div>
)}

{sections.volunteerExperience && (
  <div>
    <h3>Volunteer Experience</h3>
    {volunteerExperiences.map((vol, index) => (
      <div key={index}>
        <input
          type="text"
          value={vol.role}
          onChange={(e) => {
            const newExperiences = [...volunteerExperiences];
            newExperiences[index].role = e.target.value;
            setVolunteerExperiences(newExperiences);
          }}
          placeholder="Role"
        />
        <input
          type="text"
          value={vol.organization}
          onChange={(e) => {
            const newExperiences = [...volunteerExperiences];
            newExperiences[index].organization = e.target.value;
            setVolunteerExperiences(newExperiences);
          }}
          placeholder="Organization"
        />
        <input
          type="text"
          value={vol.duration}
          onChange={(e) => {
            const newExperiences = [...volunteerExperiences];
            newExperiences[index].duration = e.target.value;
            setVolunteerExperiences(newExperiences);
          }}
          placeholder="Duration"
        />
        <textarea
          value={vol.description}
          onChange={(e) => {
            const newExperiences = [...volunteerExperiences];
            newExperiences[index].description = e.target.value;
            setVolunteerExperiences(newExperiences);
          }}
          placeholder="Description"
        />
        <button type="button" onClick={() => {
          const newExperiences = volunteerExperiences.filter((_, i) => i !== index);
          setVolunteerExperiences(newExperiences);
        }}>
          Remove
        </button>
      </div>
    ))}
    <button type="button" onClick={() => setVolunteerExperiences([...volunteerExperiences, { role: '', organization: '', duration: '', description: '' }])}>Add Volunteer Experience</button>
  </div>
)}

{sections.publications && (
  <div>
    <h3>Publications</h3>
    {publications.map((pub, index) => (
      <div key={index}>
        <input
          type="text"
          value={pub.title}
          onChange={(e) => {
            const newPublications = [...publications];
            newPublications[index].title = e.target.value;
            setPublications(newPublications);
          }}
          placeholder="Title"
        />
        <input
          type="text"
          value={pub.publisher}
          onChange={(e) => {
            const newPublications = [...publications];
            newPublications[index].publisher = e.target.value;
            setPublications(newPublications);
          }}
          placeholder="Publisher"
        />
        <input
          type="text"
          value={pub.year}
          onChange={(e) => {
            const newPublications = [...publications];
            newPublications[index].year = e.target.value;
            setPublications(newPublications);
          }}
          placeholder="Year"
        />
        <button type="button" onClick={() => {
          const newPublications = publications.filter((_, i) => i !== index);
          setPublications(newPublications);
        }}>
          Remove
        </button>
      </div>
    ))}
    <button type="button" onClick={() => setPublications([...publications, { title: '', publisher: '', year: '' }])}>Add Publication</button>
  </div>
)}

{sections.professionalMemberships && (
  <div>
    <h3>Professional Memberships</h3>
    {professionalMemberships.map((mem, index) => (
      <div key={index}>
        <input
          type="text"
          value={mem.organization}
          onChange={(e) => {
            const newMemberships = [...professionalMemberships];
            newMemberships[index].organization = e.target.value;
            setProfessionalMemberships(newMemberships);
          }}
          placeholder="Organization"
        />
        <input
          type="text"
          value={mem.role}
          onChange={(e) => {
            const newMemberships = [...professionalMemberships];
            newMemberships[index].role = e.target.value;
            setProfessionalMemberships(newMemberships);
          }}
          placeholder="Role"
        />
        <button type="button" onClick={() => {
          const newMemberships = professionalMemberships.filter((_, i) => i !== index);
          setProfessionalMemberships(newMemberships);
        }}>
          Remove
        </button>
      </div>
    ))}
    {/* <button type="button" onClick={() => setProfessionalMemberships([...professionalMemberships, { organization: '', role: '' }])}>Add Membership</button> */}
  </div>
)}

{sections.references && (
  <div>
    <h3>References</h3>
    {references.map((ref, index) => (
      <div key={index}>
        <input
          type="text"
          value={ref.name}
          onChange={(e) => {
            const newReferences = [...references];
            newReferences[index].name = e.target.value;
            setReferences(newReferences);
          }}
          placeholder="Name"
        />
        <input
          type="text"
          value={ref.contactInfo}
          onChange={(e) => {
            const newReferences = [...references];
            newReferences[index].contactInfo = e.target.value;
            setReferences(newReferences);
          }}
          placeholder="Contact Info"
        />
        <input
          type="text"
          value={ref.relationship}
          onChange={(e) => {
            const newReferences = [...references];
            newReferences[index].relationship = e.target.value;
            setReferences(newReferences);
          }}
          placeholder="Relationship"
        />
        <button type="button" onClick={() => {
          const newReferences = references.filter((_, i) => i !== index);
          setReferences(newReferences);
        }}>
          Remove
        </button>
      </div>
    ))}
    <button type="button" onClick={() => setReferences([...references, { name: '', contactInfo: '', relationship: '' }])}>Add Reference</button>
  </div>
)}

{sections.additionalInformation && (
  <div>
    <h3>Additional Information</h3>
    <textarea
      value={additionalInformation}
      onChange={(e) => setAdditionalInformation(e.target.value)}
      placeholder="Additional Information"
    />
  </div>
)}
{sections.links && (
  <div>
    <h3>Links</h3>
    {links.map((link, index) => (
      <div key={index}>
        <input
          type="text"
          name="label"
          value={link.label}
          onChange={(e) => {
            const updatedLinks = [...links];
            updatedLinks[index].label = e.target.value;
            setLinks(updatedLinks);
          }}
          placeholder="Link Label (e.g., GitHub, Portfolio)"
        />
        <input
          type="url"
          name="url"
          value={link.url}
          onChange={(e) => {
            const updatedLinks = [...links];
            updatedLinks[index].url = e.target.value;
            setLinks(updatedLinks);
          }}
          placeholder="URL"
        />
        <button type="button" onClick={() => {
          const updatedLinks = links.filter((_, i) => i !== index);
          setLinks(updatedLinks);
        }}>
          Remove
        </button>
      </div>
    ))}
    <button type="button" onClick={() => setLinks([...links, { label: '', url: '' }])}>Add Link</button>
  </div>
)}

        
        {sections.socialMedia && (
  <div>
    <h3>Social Media</h3>
    {socialMedia.map((social, index) => (
      <div key={index}>
        <input
          type="text"
          value={social.platform}
          onChange={(e) => {
            const newSocial = [...socialMedia];
            newSocial[index].platform = e.target.value;
            setSocialMedia(newSocial);
          }}
          placeholder="Social Media Platform"
        />
        <input
          type="text"
          value={social.url}
          onChange={(e) => {
            const newSocial = [...socialMedia];
            newSocial[index].url = e.target.value;
            setSocialMedia(newSocial);
          }}
          placeholder="Social Media URL"
        />
        <button type="button" onClick={() => {
          const newSocial = socialMedia.filter((_, i) => i !== index);
          setSocialMedia(newSocial);
        }}>
          Remove
        </button>
      </div>
    ))}
    <button type="button" onClick={() => setSocialMedia([...socialMedia, { platform: '', url: '' }])}>Add Social Media</button>
  </div>
)}

{/* Submit Button */}

<button type="submit" disabled={loading}>
          {loading ? 'Generating Resume...' : 'Generate Resume'}
        </button>
      </form>

      
     
      
    </div>
    {/* <button type="submit">Generate Resume</button> */}
    </form>
  );
};
export default ResumeBuilder;