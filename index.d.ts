import { Router } from "express";

declare function Postdog(
  router: Router,
  { mount, name }: { mount: string; name: string }
): Router;

export = Postdog;
