import { TConfigModalSection } from "@/app/profile/(views)/profile/config-modal/store";

export class ClientRouting {
  public static auth() {
    const basePath = "/auth";

    return {
      slash: basePath,
      signUp: `${basePath}/sign-up`,
      signIn: `${basePath}/sign-in`,
    };
  }

  public static explore() {
    const basePath = "/";

    return { slash: basePath };
  }

  public static profile() {
    const basePath = "/profile";

    return {
      slash: basePath,
      configSection: (section: TConfigModalSection) =>
        `${basePath}?config-section=${section}`,
    };
  }

  public static projects() {
    const basePath = "/projects";

    return { slash: basePath };
  }

  public static star() {
    const basePath = "/star";

    return { slash: basePath };
  }
}
