const About = () => {
  return (
    <section className="bg-surface">
      <div className="rounded-xl p-5 sm:p-8 max-w-4xl px-4 py-8 text-text sm:px-6 lg:px-8 mx-auto">
        <h1 className="my-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Hey, It&apos;s <span className="text-primary">Harsh</span> 👋
        </h1>

        <div className="space-y-4 text-base leading-relaxed text-text-secondary sm:text-lg">
          <p>
            Thanks for visiting Harsh Applications. I really appreciate your
            time and hope this small tool helps you with your image conversion
            needs.
          </p>

          <p>
            This website is created to make image conversion simple and easy. No
            complicated steps, just upload your image, choose the format, and
            convert it.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-text sm:text-2xl">
            About this version
          </h2>

          <p className="text-text-secondary">
            This is{" "}
            <span className="font-semibold text-primary underline underline-offset-4">
              version 2
            </span>{" "}
            of Harsh Applications. In this version, batch image conversion has
            been introduced, allowing users to convert multiple images at once
            instead of processing them individually.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-lg font-semibold text-text sm:text-xl">
            What&apos;s new in Version 2?
          </h3>

          <ul className="list-inside list-disc space-y-2 pl-2 text-text-secondary">
            <li>Batch image conversion support</li>
            <li>Multiple image upload and management</li>
            <li>ZIP download for converted files</li>
            <li>Improved file handling and cleanup</li>
            <li>Better user experience while converting images</li>
            <li className="flex flex-wrap items-center gap-2">
              Enhanced single image conversion with image thumbnail preview and
              drag-and-drop file selection.
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                New
              </span>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              Added image preview support for batch conversion.
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                New
              </span>
            </li>
          </ul>
        </div>

        <details className="mt-8 rounded-2xl border border-border bg-background p-3 text-text-secondary">
          <summary className="cursor-pointer list-none font-medium text-text">
            Version 1
          </summary>
          <p className="mt-3 rounded-xl border border-border bg-surface-alt p-3 text-sm leading-relaxed text-text-secondary">
            The first version focuses on the basic image conversion feature,
            where you can convert images between different formats quickly.
          </p>
        </details>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold text-text">Future plans</h3>

          <p className="text-text-secondary">
            In the next versions, more useful features will be added like:
          </p>

          <div className="rounded-sm border-l-4 border-info bg-info-soft/70 p-4 text-base text-text sm:text-lg">
            More useful tools are planned for upcoming versions, including image
            compression, resizing, and other interesting features.
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold text-text">A small quote.</h3>

          <blockquote className="rounded-2xl border border-border bg-background px-4 py-5 text-center text-lg italic text-text sm:text-xl">
            Every big project starts with a small version. This is mine, and
            there is more to come.
          </blockquote>

          <p className="italic text-text-secondary">
            <q>Sometimes the simple tools are the ones we use the most.</q>
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <h3 className="text-xl font-semibold text-text">Like it?</h3>

          <p className="text-text-secondary">
            If you find this tool useful, share it with others. A small share
            can help this little project reach more people.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
