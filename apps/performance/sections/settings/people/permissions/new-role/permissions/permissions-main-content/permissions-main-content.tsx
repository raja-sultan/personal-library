// PermissionsMainContent.tsx

import React from "react";
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { PERMISSIONS as permissionsData } from "@enums/permissions";
import type { PermissionsContentTypes } from "../../new-role.types";

interface PermissionsProps extends PermissionsContentTypes {
  activeTab: string;
}

function PermissionsMainContent({
  activeTab,
  checked,
  setChecked,
  checkedIds,
  setCheckedIds,
}: PermissionsProps): JSX.Element {
  // console.log("CHECKED STATE: ", checked);
  // console.log("CHECKED IDS: ", checkedIds);

  const handleCheckChange = (
    moduleId: string,
    isChecked: boolean,
    relation: string,
    childrenIds: string[] = []
  ): any => {
    // console.log("MODULE ID: ", moduleId);
    // console.log("CHILDREN IDS: ", childrenIds);

    if (relation === "parent") {
      setChecked((prevChecked) => {
        const updatedChecked = {
          ...prevChecked,
          [moduleId]: isChecked,
        };

        // Check/uncheck all children
        childrenIds.forEach((childId) => {
          updatedChecked[childId] = isChecked;
        });

        return updatedChecked;
      });

      // Update checkedIds based on isChecked
      const newCheckedIds = isChecked
        ? Array.from(new Set([...checkedIds, ...childrenIds]))
        : checkedIds.filter((id) => !childrenIds.includes(id));

      setCheckedIds(newCheckedIds);
    }

    if (relation === "child") {
      const newCheckedIds = isChecked
        ? Array.from(new Set([...checkedIds, moduleId]))
        : checkedIds.filter((id) => id !== moduleId);
      setCheckedIds(newCheckedIds);
      setChecked((prevChecked) => ({
        ...prevChecked,
        [moduleId]: isChecked,
      }));
    }
  };

  const renderCheckboxes = (): JSX.Element => {
    const allModules = permissionsData.PERFORMANCE;
    const submodule = activeTab ? findSubmodule(activeTab, allModules) : null;

    if (submodule) {
      return <Box>{renderModuleCheckboxes(submodule)}</Box>;
    }

    return (
      <Typography variant="body1">
        Select a module to view its permissions.
      </Typography>
    );
  };

  const renderModuleCheckboxes = (module: any): JSX.Element => {
    const nestedModules = Object.values(module);
    return (
      <Stack>
        {nestedModules.slice(2).map((nestedModule) => (
          <Box key={(nestedModule as any)?.id}>
            {(nestedModule as any)?.PERMISSION && (
              <FormControlLabel
                key={(nestedModule as any)?.id}
                control={
                  <Checkbox
                    checked={
                      checkedIds.filter(
                        (id) =>
                          id.split(".").slice(0, -1).join(".") ===
                          (nestedModule as any)?.id
                      ).length ===
                        Object.values((nestedModule as any).PERMISSION)
                          .length || false
                    }
                    onChange={(e) => {
                      handleCheckChange(
                        (nestedModule as any)?.id,
                        e.target.checked,
                        "parent",
                        (nestedModule as any).PERMISSION
                          ? Object.values((nestedModule as any).PERMISSION).map(
                              (permission: any) => permission.id
                            )
                          : []
                      );
                    }}
                  />
                }
                label={<Typography fontSize="1.6rem" fontWeight="600" >{(nestedModule as any)?.name}</Typography>}
              />
            )}

            {(nestedModule as any)?.PERMISSION && (
              <Stack spacing={1.6} ml={2}>
                {Object.values((nestedModule as any).PERMISSION).map(
                  (permission: any) => (
                    <FormControlLabel
                      key={permission.id}
                      sx={{mt:"0 !important"}}
                      control={
                        <Checkbox
                          checked={checked[permission.id] || false}
                          onChange={(e) => {
                            handleCheckChange(
                              permission.id,
                              e.target.checked,
                              "child",
                              (nestedModule as any).PERMISSION
                                ? Object.values(
                                    (nestedModule as any).PERMISSION
                                  ).map(
                                    (permissionItem: any) => permissionItem.id
                                  )
                                : []
                            );
                          }}
                        />
                      }
                      label={<Typography fontSize="1.6rem" >{permission.name}</Typography>}
                    />
                  )
                )}
              </Stack>
            )}
          </Box>
        ))}
      </Stack>
    );
  };

  return (
    <Card sx={{ px: 3, pt: 3, pb: 4.5, height: "100%" }}>
      {renderCheckboxes()}
    </Card>
  );
}

function findSubmodule(
  activeTab: string,
  allModules: Record<string, any>
): any {
  const flattenAndFind = (subModule, id): any => {
    if (subModule.id === id) {
      return subModule;
    }
    if (subModule.PERMISSION) {
      for (const key in subModule.PERMISSION) {
        if (subModule.PERMISSION[key].id === id) {
          return subModule.PERMISSION[key];
        }
      }
    }
    return null;
  };

  const searchModule = (): any => {
    let resultObject = null;

    Object.values(allModules).some((singleModule) => {
      for (const key in singleModule) {
        if (singleModule[key].id === activeTab) {
          resultObject = singleModule[key];
          return true;
        }
        const result = flattenAndFind(singleModule[key], activeTab);
        if (result) {
          resultObject = result;
          return true;
        }
      }
      return false;
    });

    return resultObject;
  };

  return searchModule();
}

export default PermissionsMainContent;
