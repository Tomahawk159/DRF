import React from 'react'


const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.users_id}
            </td>
        </tr>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <table>
            <th>
                Name
            </th>
            <th>
                Users_id
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}
export default ProjectList;
