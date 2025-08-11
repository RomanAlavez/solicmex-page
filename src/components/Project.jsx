import Carousel from "./Carousel"
export default function ProjectCard({ name, description, ubication, app, images }) {
    return (
        <div className="flex flex-col p-2 gap-5 text-white w-full max-h-full overflow-y-auto">
            <header className="flex flex-col gap-2 w-full">
                <h6 className="text-3xl font-bold text-left text-wrap" style={{ viewTransitionName: `project-name-${name}` }}>{name} <span className="text-lg font-semibold text-left text-gray-100">- {app}</span></h6>
                <p className="text-md text-gray-100 text-left text-pretty" style={{ viewTransitionName: `project-description-${name}` }}>{description}</p>
            </header>
            <main>
                <Carousel images={images}/>
            </main>
        </div>
    )
}