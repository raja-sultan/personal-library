import CustomModal from "@components/custom-modal";
import { Box,Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { styles } from "./view-plans-styles";
import { useViewPlans } from "./use-view-plans";

interface ViewPlansModalProps {
  handleModal: any;
  getCareerSkillsId: string | null;
}

function ViewPlansModal(props: ViewPlansModalProps): JSX.Element {
  const { handleModal, getCareerSkillsId } = props;
  const {
    handleAccordionChange,
    expandedAccordion,
    data,
    careerPlansData,
    isLoadingCareerPlans,
  } = useViewPlans(getCareerSkillsId);

  return (
    <CustomModal
      open={handleModal}
      onClose={handleModal}
      headerIcon={false}
      title={data?.data[0]?.name ? data?.data[0]?.name : "..."}
      acceptText=""
      message={data?.data[0]?.description ? data?.data[0]?.description : "..."}
      hideFooter
      maxWidth="lg"
    >
      <Typography
        variant="body1"
        fontWeight="600"
        color="text.primary"
        marginBottom="1rem"
      >
        Plans
      </Typography>

      <Box>
        
        {data?.data[0]?.plans.length > 1  && data?.data[0]?.plans?.map((item) => (
          <Accordion
            key={item._id}
            sx={styles.wrap_accordion}
            expanded={expandedAccordion === item?._id}
            onChange={() => {
              handleAccordionChange(item?._id);
            }}
          >
            <AccordionSummary
              aria-controls="accordion-content"
              id="accordion-header"
            >
              <ExpandCircleDownOutlinedIcon
                sx={expandedAccordion === item._id ? styles.myMuiIcon : null}
              />
              <Typography
                variant="body2"
                fontWeight="600"
                color="text.primary"
                marginLeft="2.4rem"
              >
                {item?.title}
              </Typography>
            </AccordionSummary>
            <Box sx={styles.modalInnerContentWrap}>
              {isLoadingCareerPlans ? (
                <>loading...</>
              ) : (
                <>
                  {careerPlansData?.data[0]?.levels?.map((levelItem) => (
                    <AccordionDetails
                      key={levelItem?._id}
                      sx={styles.wrap_accordion_details}
                    >
                      {/* Assuming '_id' is unique */}
                      <Box sx={styles.accordion_details}>
                        {levelItem.levelName}
                      </Box>
                      <ul>
                        {levelItem.skillLevel.map((skill) => (
                          <li style={{fontSize:"1.6rem",color:"#344054",marginBottom:"10px",textAlign:"justify"}} key={skill._id}>
                            {skill.text}
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  ))}
                </>
              )}
            </Box>
          </Accordion>
        ))}
      </Box>
    </CustomModal>
  );
}

export default ViewPlansModal;
