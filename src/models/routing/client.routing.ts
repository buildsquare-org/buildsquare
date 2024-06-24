export class ClientRouting {
  public static feed() {
    const basePath = "/";

    return { slash: basePath };
  }

  public static profile() {
    const basePath = "/profile";

    return { slash: basePath };
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