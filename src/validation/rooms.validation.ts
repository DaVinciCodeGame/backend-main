import Joi from 'joi';

const schema = {
  createRoom: {
    reqBody: Joi.object().keys({
      roomName: Joi.string().required().description('방 이름'),
      maxMembers: Joi.number()
        .min(2)
        .max(4)
        .required()
        .description('최대 인원'),
      password: Joi.string().allow(null).required().description('방 암호'),
    }),
    resBody: Joi.object().keys({
      roomId: Joi.number().required().description('방 식별자'),
    }),
  },
  getPagedList: {
    reqQuery: Joi.object().keys({
      page: Joi.number().description('목록 번호'),
      searchType: Joi.string().description('검색 유형'),
      search: Joi.string().description('검색어'),
    }),
    resBody: Joi.object().keys({
      maxPage: Joi.number().required().description('최대 페이지'),
      rooms: Joi.array()
        .items(
          Joi.object().keys({
            currentMembers: Joi.number().required().description('현재 인원'),
            maxMembers: Joi.number().required().description('최대 인원'),
            isPlaying: Joi.boolean().required().description('진행 중 여부'),
            roomId: Joi.number().required().description('방 식별자'),
            roomName: Joi.string().required().description('방 이름'),
            isPrivate: Joi.boolean().required().description('비공개 여부'),
          })
        )
        .required()
        .description('방 목록'),
    }),
  },
  quickStart: {
    resBody: Joi.object().keys({
      roomId: Joi.number().required().description('방 식별자'),
    }),
  },
};

export default schema;
